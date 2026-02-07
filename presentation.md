# Invoice Extraction Pipeline
## Presentation Slides

---

## Slide 1: Problem Statement

**Goal**: Automatically extract structured data from tractor/asset invoice images

**Challenges**:
- Invoices in multiple languages (English, Hindi, Marathi)
- Handwritten + printed text mixed together
- Non-standard layouts across dealers
- Signatures and stamps overlapping with text
- Indian number formats (e.g., 9,23,637/-)

**Output Required**:
- Dealer Name, Model Name, Horse Power, Asset Cost
- Signature & Stamp detection with bounding boxes

---

## Slide 2: Architecture Overview

**Mindset**:
- We build a multipass self validated system on top of a Leading light weight OCR model.
- Not finetuning so we support multiple passes each for a specific demand, narrwoing the context
  window.

```
Invoice Image
      |
      v
  [Preprocessing]  ──>  RGB conversion + LANCZOS downscale
      |
      v
  [Layout mapping]  ──> Mapping by Yolo  
      |
      v
  [3-Pass Qwen VL Extraction]
      |   Pass 1: Top section detected by yolo  ──>  Dealer Name 
      |   Pass 2: Image (excluding header)    ──>  Model Name + HP
      |   Pass 3: Image (excluding header)     ──>  Asset Cost
      |
      v
  [RT-DETR Detection]
      |   Model 1  ──>  Signature (bbox)
      |   Model 2  ──>  Stamp (bbox)
      |
      v
  [Post-Processing]  ──>  JSON parsing + Brand cleaning + Schema validation
      |
      v
  Structured JSON Output
```

---

## Slide 3: Models Used

| Component | Model | Purpose | Quantization |
|-----------|-------|---------|-------------|
| Text Extraction | Qwen 2.5-VL 7B | OCR + field extraction | 4-bit (unsloth) |
| Signature Detection | RF-DETR Small | Object detection | Full precision |
| Stamp Detection | RF-DETR Small | Object detection | Full precision |

- **Qwen 2.5-VL**: Vision-Language model, handles multilingual text
- **RF-DETR**: Real-time Detection Transformer, fast & accurate for small objects
- All models loaded once at startup, shared across requests

---

## Slide 4: Image Preprocessing

**Before any model sees the image**:

Fromat preprocessing.

1. **RGB Conversion**: `.convert("RGB")`
   - Prevents crashes from RGBA/palette PNGs

2. **Large Image Cap**: Max 6.3M pixels (3072 x 2048)
   - Area-based proportional downscale
   - Preserves aspect ratio
   - LANCZOS resampling (sharpest for text)

3. **Independent Processor**: Bypasses unsloth's default 512px resize
   - `min_pixels = 200,704` (~450x450)
   - `max_pixels = 1,003,520` (~1000x1000)
   - Uses Qwen's native `smart_resize` (dimensions aligned to 28px patches)

Defaulting focus area.
 
 1. We cut the image into two sections HEADER + Rest Body, using our custom trained yolo model.
 2. We pass each scetion only instead of the entire pass in th eusbseqeqnt qwen calls.


---

## Slide 5: Three-Pass Qwen Extraction Strategy

### Why Multi-Pass? -> Focused taiored prompts
- Each pass focuses on a single task with a tailored prompt
- Reduces hallucination — less noise, more precision
- Different image regions for different fields

### Pass 1: Dealer Name
- **Input**: Top 30% of image (header crop)
- **Prompt**: Focused on dealer/seller name, ignoring brand logos
- **Max tokens**: 256
- **Output**: `{"dealer_name": "..."}`

### Pass 2: Model Name + Horse Power
- **Input**: Full image
- **Prompt**: 4-step sold model identification rules, Hindi HP notation
- **Max tokens**: 1000
- **Output**: `{"model_name": "...", "horse_power": ...}`

### Pass 3: Asset Cost
- **Input**: Full image
- **Prompt**: Multi-language keyword matching, Indian number format rules, sanity checks
- **Max tokens**: 128
- **Output**: `{"asset_cost": ...}`

---

## Slide 6: Pass 1 — Dealer Name Extraction

```
 ┌─────────────────────────┐
 │  DEALER HEADER (top 30%)│ ◄── Cropped region
 │  "ABC Tractor Sales"    │
 ├─────────────────────────┤
 │                         │
 │  (rest of invoice       │
 │   ignored in Pass 1)    │
 │                         │
 └─────────────────────────┘
```

**Key Prompt Rules**:
- Dealer = the SHOP issuing the document
- NOT the tractor manufacturer (ignore Mahindra, Swaraj logos)
- Preserve original vernacular (Hindi, Marathi, etc.)
- If only a government corporation name is shown, use that

---

## Slide 7: Pass 2 — Model + HP Extraction

**Sold Model Identification Priority**:
1. Row with QUANTITY (e.g., 01) AND a PRICE filled in
2. Row with a TICK MARK (✓) or handwritten price
3. Single tractor model if only one listed (ignore accessories)
4. Row with most handwritten annotations

**Horse Power Detection**:
- Handles: "55 ha.pa.", "48 H.P.", "(45)", "40 HP", "BHP"
- Hindi: ha.pa. = HP
- May appear on the same line OR below the model name

---

## Slide 8: Pass 3 — Cost Extraction

**Multi-language keyword search**:
- English: "Grand Total", "Total", "Net Amount"
- Hindi: "kul yog", "kul"
- Marathi: "ekun"

**Indian Number Format Handling**:
```
9,23,637     =  923,637
11,06,506    =  1,106,506
4,50,000=00  =  450,000
9,23,637/-   =  923,637  (NOT 9,236,371)
```

**Sanity Check**: Tractors cost 3-15 lakh. If result > 20 lakh, likely misread `/-` as digits.

---

## Slide 9: RT-DETR Signature & Stamp Detection

**Two independent RF-DETR Small models**:

| Model | Task | Output |
|-------|------|--------|
| Signature Detector | Find handwritten signatures | `[x1, y1, x2, y2]` bbox |
| Stamp Detector | Find round/square stamps | `[x1, y1, x2, y2]` bbox |

- Confidence threshold: 0.35
- Returns highest-confidence detection per image
- Handles overlapping signatures and stamps
- Runs on full (preprocessed) image

---

## Slide 10: Post-Processing Pipeline

### JSON Parsing (3-tier fallback)
```
Qwen raw output
  ├── Try 1: Extract from ```json ... ``` blocks
  ├── Try 2: Find raw { ... } and json.loads()
  └── Try 3: Regex fallback for individual fields
```
### Schema Validation 
 - Validation + Post processing on horse power name making sure its in integer.
 - Same on Cost.
 - The basis are we mak sure it fit in the data range we know by our EDA.
---

## Slide 11: Result Assembly

```json
{
  "doc_id": "invoice_001.png",
  "fields": {
    "dealer_name": "ABC Tractor Sales",
    "model_name": "SWARAJ 744 FE",
    "horse_power": 48,
    "asset_cost": 801815,
    "signature": {
      "present": true,
      "bbox": [866, 1428, 1013, 1491]
    },
    "stamp": {
      "present": true,
      "bbox": [774, 1466, 1097, 1556]
    }
  },
  "confidence": 0.85,
  "processing_time_sec": 45.2
}
```

---

## Slide 12: Failure Analysis & Edge Cases

This section documents specific cases where the pipeline failed, root cause analysis, and fixes applied or proposed.

---

### Failure Case 1: [Image Reference]

**Field affected**: [Dealer Name / Model Name / HP / Cost / Signature / Stamp]

**Expected output**:
```json
{ }
```

**Actual output**:
```json
{ }
```

**Root cause**:
- [ Describe why the model failed — e.g., handwritten text too faint, overlapping stamp, misread character ]

**Category**: [ Handwriting Recognition / Number Misread / Language Issue / Layout Confusion / Overlapping Elements / Low Image Quality ]

**Fix applied / proposed**:
- [ Prompt change / preprocessing change / post-processing rule / unresolvable ]

**Status**: [ Fixed ✅ / Partially Fixed ⚠️ / Open ❌ ]

---

### Failure Case 2: [Image Reference]

**Field affected**:

**Expected output**:
```json
{ }
```

**Actual output**:
```json
{ }
```

**Root cause**:
-

**Category**:

**Fix applied / proposed**:
-

**Status**:

---

### Failure Case 3: [Image Reference]

**Field affected**:

**Expected output**:
```json
{ }
```

**Actual output**:
```json
{ }
```

**Root cause**:
-

**Category**:

**Fix applied / proposed**:
-

**Status**:

---

### Failure Summary Table

| # | Image | Field | Category | Root Cause (short) | Status |
|---|-------|-------|----------|-------------------|--------|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

---

### Failure Pattern Analysis

**Most common failure categories**:
1. [ e.g., Handwriting Recognition — X out of Y cases ]
2. [ e.g., Number Misread (/-  as 1) — X out of Y cases ]
3. [ e.g., Incomplete model name — X out of Y cases ]

**Failure by pass**:
| Pass | Total failures | % of total |
|------|---------------|------------|
| Pass 1 (Dealer) | | |
| Pass 2 (Model/HP) | | |
| Pass 3 (Cost) | | |
| Signature | | |
| Stamp | | |

**Key takeaway**: [ Summary of weakest link and what would most improve accuracy ]

---