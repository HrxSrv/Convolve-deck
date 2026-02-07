"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import DataTable from "@/components/ui/DataTable";
import GlowCard from "@/components/ui/GlowCard";

export default function Slide09Detection() {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-8 md:p-16 relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full"
      >
        <motion.div variants={fadeUp} className="mb-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent-orange">
            09 — RT-DETR Detection
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-8"
        >
          Signature & stamp detection
        </motion.h1>

        <DataTable
          headers={["Model", "Task", "Output"]}
          rows={[
            ["Signature Detector", "Find handwritten signatures", "[x1, y1, x2, y2] bbox"],
            ["Stamp Detector", "Find round/square stamps", "[x1, y1, x2, y2] bbox"],
          ]}
          accent="orange"
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visual bbox illustration */}
          <GlowCard accent="orange" delay={0.4}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4">
              Bounding Box Detection
            </h3>
            <div className="relative bg-bg-primary/50 rounded border border-border-subtle p-6 h-48">
              {/* Mock invoice body */}
              <div className="space-y-2 opacity-30">
                <div className="h-2 w-full bg-white/10 rounded" />
                <div className="h-2 w-4/5 bg-white/10 rounded" />
                <div className="h-2 w-full bg-white/10 rounded" />
                <div className="h-2 w-3/4 bg-white/10 rounded" />
              </div>

              {/* Signature bbox */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="absolute bottom-12 left-6 w-24 h-12 border-2 border-accent-orange/60 rounded"
                style={{ boxShadow: "var(--glow-orange)" }}
              >
                <span className="absolute -top-5 left-0 text-[9px] font-mono text-accent-orange">
                  signature
                </span>
                <svg className="w-full h-full opacity-30" viewBox="0 0 80 40">
                  <path
                    d="M5 30 Q20 5, 40 25 T75 15"
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="1.5"
                  />
                </svg>
              </motion.div>

              {/* Stamp bbox */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="absolute bottom-8 right-6 w-16 h-16 border-2 border-accent-teal/60 rounded"
                style={{ boxShadow: "var(--glow-teal)" }}
              >
                <span className="absolute -top-5 left-0 text-[9px] font-mono text-accent-teal">
                  stamp
                </span>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-accent-teal/30 flex items-center justify-center">
                    <span className="text-[8px] text-accent-teal/50">SEAL</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </GlowCard>

          {/* Config details */}
          <div className="space-y-3">
            <GlowCard accent="teal" delay={0.5}>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-text-secondary">Confidence threshold</span>
                <code className="font-mono text-sm text-accent-teal font-bold">0.35</code>
              </div>
            </GlowCard>
            <GlowCard accent="teal" delay={0.55}>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-text-secondary">Selection</span>
                <code className="font-mono text-xs text-accent-teal">Highest confidence per image</code>
              </div>
            </GlowCard>
            <GlowCard accent="teal" delay={0.6}>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-text-secondary">Overlap handling</span>
                <code className="font-mono text-xs text-accent-teal">Yes — independent models</code>
              </div>
            </GlowCard>
            <GlowCard accent="teal" delay={0.65}>
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-text-secondary">Input</span>
                <code className="font-mono text-xs text-accent-teal">Full preprocessed image</code>
              </div>
            </GlowCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
