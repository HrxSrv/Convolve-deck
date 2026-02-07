"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import GlowCard from "@/components/ui/GlowCard";

const tiers = [
  {
    tier: "Try 1",
    method: "Extract from ```json ... ``` blocks",
    icon: "▸",
    accent: "teal" as const,
  },
  {
    tier: "Try 2",
    method: "Find raw { ... } and json.loads()",
    icon: "▸",
    accent: "teal" as const,
  },
  {
    tier: "Try 3",
    method: "Regex fallback for individual fields",
    icon: "▸",
    accent: "orange" as const,
  },
];

const validations = [
  "Horse power → cast to integer, validate range (15–100 HP)",
  "Asset cost → cast to integer, validate range (3–15 lakh)",
  "Dealer name → strip trailing punctuation, normalize spacing",
  "Model name → brand name cleaning, remove accessory listings",
];

export default function Slide10PostProcessing() {
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
            10 — Post-Processing
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-8"
        >
          Parse, validate, clean
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* JSON Parsing Pipeline */}
          <div>
            <motion.h3
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4"
            >
              JSON Parsing — 3-tier Fallback
            </motion.h3>

            <div className="relative">
              {/* Vertical pipeline line */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-teal/40 via-accent-teal/20 to-accent-orange/20 origin-top"
              />

              <div className="space-y-3">
                <motion.div
                  variants={fadeUp}
                  className="relative pl-12 py-2"
                >
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-surface border border-accent-teal/30 flex items-center justify-center z-10">
                    <span className="text-accent-teal text-[10px] font-mono">▼</span>
                  </div>
                  <span className="font-mono text-xs text-text-muted">Qwen raw output</span>
                </motion.div>

                {tiers.map((t, i) => (
                  <GlowCard key={t.tier} accent={t.accent} delay={0.4 + i * 0.1} className="ml-10">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${t.accent === "orange" ? "text-accent-orange" : "text-accent-teal"}`}>
                        {t.icon}
                      </span>
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                          {t.tier}
                        </span>
                        <p className="font-mono text-xs text-text-secondary">
                          {t.method}
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </div>
          </div>

          {/* Schema Validation */}
          <div>
            <motion.h3
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4"
            >
              Schema Validation
            </motion.h3>

            <div className="space-y-3">
              {validations.map((v, i) => (
                <GlowCard key={i} accent="teal" delay={0.5 + i * 0.08}>
                  <div className="flex gap-3 items-start">
                    <span className="text-accent-teal text-xs mt-0.5">✓</span>
                    <p className="font-mono text-xs text-text-secondary leading-relaxed">
                      {v}
                    </p>
                  </div>
                </GlowCard>
              ))}
            </div>

            <motion.p
              variants={fadeUp}
              className="mt-4 font-mono text-xs text-text-muted leading-relaxed"
            >
              Values checked against known ranges from EDA — ensures outputs fit
              the data distribution.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
