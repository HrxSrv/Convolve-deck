"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import GlowCard from "@/components/ui/GlowCard";

const rules = [
  "Dealer = the SHOP issuing the document",
  'NOT the tractor manufacturer (ignore Mahindra, Swaraj logos)',
  "Preserve original vernacular (Hindi, Marathi, etc.)",
  "If only a government corporation name is shown, use that",
];

export default function Slide06DealerName() {
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
            06 — Pass 1: Dealer Name
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-8"
        >
          Header crop extraction
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visual crop diagram */}
          <motion.div variants={fadeUp}>
            <div className="relative rounded-lg border border-accent-teal/20 overflow-hidden">
              {/* Header region */}
              <div className="bg-accent-teal/10 border-b-2 border-accent-teal/40 border-dashed p-6 relative">
                <div className="absolute top-2 right-2 text-[9px] font-mono uppercase tracking-wider text-accent-teal">
                  ← Cropped Region
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-3/4 bg-accent-teal/20 rounded" />
                  <div className="font-mono text-sm text-accent-teal font-bold">
                    &quot;ABC Tractor Sales&quot;
                  </div>
                  <div className="h-2 w-1/2 bg-accent-teal/10 rounded" />
                </div>
                <div className="absolute bottom-1 left-3 text-[9px] font-mono text-text-muted">
                  DEALER HEADER (YOLO detected)
                </div>
              </div>
              {/* Body region */}
              <div className="bg-bg-surface/50 p-6 opacity-40">
                <div className="space-y-3">
                  <div className="h-2 w-full bg-white/5 rounded" />
                  <div className="h-2 w-5/6 bg-white/5 rounded" />
                  <div className="h-2 w-4/6 bg-white/5 rounded" />
                  <div className="h-2 w-full bg-white/5 rounded" />
                  <div className="h-2 w-3/4 bg-white/5 rounded" />
                </div>
                <div className="mt-4 text-[9px] font-mono text-text-muted text-center">
                  Rest of invoice — ignored in Pass 1
                </div>
              </div>
            </div>
          </motion.div>

          {/* Prompt rules */}
          <div className="space-y-3">
            <motion.div variants={fadeUp}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">
                Key Prompt Rules
              </h3>
            </motion.div>

            {rules.map((rule, i) => (
              <GlowCard key={i} accent="teal" delay={0.4 + i * 0.08}>
                <div className="flex gap-3 items-start">
                  <span className="text-accent-teal font-mono text-xs font-bold mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-mono text-sm text-text-secondary leading-relaxed">
                    {rule}
                  </p>
                </div>
              </GlowCard>
            ))}

            <motion.div variants={fadeUp} className="pt-4">
              <code className="text-[11px] font-mono text-accent-teal/70 bg-accent-teal/5 px-3 py-2 rounded block">
                {`→ {"dealer_name": "ABC Tractor Sales"}`}
              </code>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
