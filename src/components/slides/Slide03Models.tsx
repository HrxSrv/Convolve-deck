"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import DataTable from "@/components/ui/DataTable";
import GlowCard from "@/components/ui/GlowCard";

export default function Slide03Models() {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-8 md:p-16 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full"
      >
        <motion.div variants={fadeUp} className="mb-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent-teal">
            03 — Models Used
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-8"
        >
          The model stack
        </motion.h1>

        <DataTable
          headers={["Component", "Model", "Purpose", "Quantization"]}
          rows={[
            ["Text Extraction", "Qwen 2.5-VL 7B", "OCR + field extraction", "4-bit (unsloth)"],
            ["Signature Detection", "RF-DETR Small", "Object detection", "Full precision"],
            ["Stamp Detection", "RF-DETR Small", "Object detection", "Full precision"],
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlowCard accent="teal" delay={0.5}>
            <div className="flex items-start gap-3">
              <span className="text-accent-teal text-xl mt-0.5">⬡</span>
              <div>
                <h3 className="font-mono text-sm font-bold text-text-primary mb-1">
                  Qwen 2.5-VL 7B
                </h3>
                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                  Vision-Language model handling multilingual OCR. 4-bit quantized via
                  unsloth for efficient inference. Handles English, Hindi, Marathi.
                </p>
              </div>
            </div>
          </GlowCard>

          <GlowCard accent="orange" delay={0.6}>
            <div className="flex items-start gap-3">
              <span className="text-accent-orange text-xl mt-0.5">◇</span>
              <div>
                <h3 className="font-mono text-sm font-bold text-text-primary mb-1">
                  RF-DETR Small
                </h3>
                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                  Real-time Detection Transformer — fast and accurate for small object
                  detection. Two separate models for signatures and stamps.
                </p>
              </div>
            </div>
          </GlowCard>
        </div>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-xs font-mono text-text-muted"
        >
          All models loaded once at startup, shared across requests for zero cold-start overhead.
        </motion.p>
      </motion.div>
    </div>
  );
}
