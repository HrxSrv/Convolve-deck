"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import CodeBlock from "@/components/ui/CodeBlock";

const jsonOutput = `{
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
}`;

export default function Slide11Result() {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-8 md:p-16 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full"
      >
        <motion.div variants={fadeUp} className="mb-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent-teal">
            11 — Result Assembly
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-3"
        >
          Structured output
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-text-secondary font-mono text-sm max-w-2xl mb-8 leading-relaxed"
        >
          All passes + detections assembled into a single validated JSON document.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <CodeBlock
              code={jsonOutput}
              language="json"
              highlights={{
                dealer_name: "orange",
                model_name: "orange",
                horse_power: "orange",
                asset_cost: "orange",
              }}
              delay={0.3}
            />
          </div>

          <div className="space-y-3">
            <motion.div
              variants={fadeUp}
              className="rounded-lg border border-accent-teal/20 bg-bg-surface/80 p-4"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                Key Fields
              </span>
              <div className="mt-3 space-y-2">
                {[
                  { label: "dealer_name", type: "string", color: "text-accent-teal" },
                  { label: "model_name", type: "string", color: "text-accent-teal" },
                  { label: "horse_power", type: "int", color: "text-accent-orange" },
                  { label: "asset_cost", type: "int", color: "text-accent-orange" },
                  { label: "signature", type: "bbox", color: "text-accent-teal" },
                  { label: "stamp", type: "bbox", color: "text-accent-teal" },
                ].map((f) => (
                  <div key={f.label} className="flex justify-between items-center">
                    <code className={`text-xs font-mono ${f.color}`}>{f.label}</code>
                    <span className="text-[9px] font-mono text-text-muted uppercase">
                      {f.type}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-lg border border-accent-orange/20 bg-bg-surface/80 p-4"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                Metrics
              </span>
              <div className="mt-3 space-y-3">
                <div>
                  <span className="text-3xl font-serif text-accent-orange">0.85</span>
                  <span className="text-[10px] font-mono text-text-muted ml-2">confidence</span>
                </div>
                <div>
                  <span className="text-3xl font-serif text-accent-teal">45.2</span>
                  <span className="text-[10px] font-mono text-text-muted ml-2">sec / invoice</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
