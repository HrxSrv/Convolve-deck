"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import DataTable from "@/components/ui/DataTable";
import GlowCard from "@/components/ui/GlowCard";

const failureCases = [
  ["1", "Handwriting", "Dealer Name", "Faint handwritten text", "⚠️ Partial"],
  ["2", "Number Misread", "Cost", '/- read as digit "1"', "✅ Fixed"],
  ["3", "Language", "Dealer Name", "Mixed Hindi/Marathi script", "⚠️ Partial"],
  ["4", "Layout", "Model+HP", "Overlapping stamp on text", "❌ Open"],
  ["5", "Low Quality", "Signature", "Faded scan, low contrast", "⚠️ Partial"],
];

const patterns = [
  { category: "Handwriting Recognition", count: "3/10", pct: "30%" },
  { category: "Number Misread (/-  as 1)", count: "2/10", pct: "20%" },
  { category: "Incomplete Model Name", count: "2/10", pct: "20%" },
];

const failureByPass = [
  ["Pass 1 (Dealer)", "3", "30%"],
  ["Pass 2 (Model/HP)", "2", "20%"],
  ["Pass 3 (Cost)", "3", "30%"],
  ["Signature", "1", "10%"],
  ["Stamp", "1", "10%"],
];

export default function Slide12Failures() {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-8 md:p-12 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full"
      >
        <motion.div variants={fadeUp} className="mb-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent-orange">
            12 — Failure Analysis
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-4xl text-text-primary leading-tight mb-6"
        >
          Edge cases & <span className="text-accent-orange italic">failures</span>
        </motion.h1>

        <DataTable
          headers={["#", "Category", "Field", "Root Cause", "Status"]}
          rows={failureCases}
          accent="orange"
          className="mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pattern Analysis */}
          <GlowCard accent="orange" delay={0.5}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
              Failure Pattern Analysis
            </h3>
            <div className="space-y-3">
              {patterns.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-xs text-text-secondary">
                        {p.category}
                      </span>
                      <span className="font-mono text-xs text-accent-orange font-bold">
                        {p.count}
                      </span>
                    </div>
                    <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: p.pct }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.6 }}
                        className="h-full bg-accent-orange/60 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>

          {/* Failure by pass */}
          <GlowCard accent="teal" delay={0.6}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
              Failure Distribution by Pass
            </h3>
            <div className="space-y-2">
              {failureByPass.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1.5 border-b border-border-subtle last:border-0"
                >
                  <span className="font-mono text-xs text-text-secondary">{row[0]}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-text-muted">{row[1]} failures</span>
                    <span className="font-mono text-xs text-accent-teal font-bold w-8 text-right">
                      {row[2]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-6 rounded-lg border border-accent-teal/20 bg-bg-surface/60 p-4"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
            Key Takeaway
          </span>
          <p className="font-mono text-sm text-text-secondary mt-2 leading-relaxed">
            Weakest link: <span className="text-accent-orange">handwriting recognition</span> in
            dealer names. Biggest accuracy improvement would come from a dedicated
            handwriting OCR pre-pass or fine-tuned crop region detection.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
