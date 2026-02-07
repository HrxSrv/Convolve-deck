"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import GlowCard from "@/components/ui/GlowCard";

const priorities = [
  {
    badge: "P1",
    rule: "Row with QUANTITY (e.g., 01) AND a PRICE filled in",
  },
  {
    badge: "P2",
    rule: "Row with a TICK MARK (✓) or handwritten price",
  },
  {
    badge: "P3",
    rule: "Single tractor model if only one listed (ignore accessories)",
  },
  {
    badge: "P4",
    rule: "Row with most handwritten annotations",
  },
];

const hpFormats = [
  { format: '"55 ha.pa."', note: "Hindi notation" },
  { format: '"48 H.P."', note: "Standard" },
  { format: '"(45)"', note: "Parenthetical" },
  { format: '"40 HP"', note: "Abbreviated" },
  { format: '"BHP"', note: "Brake HP" },
];

export default function Slide07ModelHP() {
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
            07 — Pass 2: Model + HP
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-8"
        >
          Sold model identification
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Priority rules */}
          <div>
            <motion.h3
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4"
            >
              Identification Priority
            </motion.h3>

            <div className="space-y-3">
              {priorities.map((p, i) => (
                <GlowCard key={p.badge} accent="teal" delay={0.3 + i * 0.08}>
                  <div className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded bg-accent-teal/15 flex items-center justify-center">
                      <span className="text-accent-teal font-mono text-[10px] font-bold">
                        {p.badge}
                      </span>
                    </span>
                    <p className="font-mono text-xs text-text-secondary leading-relaxed pt-1.5">
                      {p.rule}
                    </p>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>

          {/* HP formats */}
          <div>
            <motion.h3
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4"
            >
              Horse Power Formats
            </motion.h3>

            <GlowCard accent="orange" delay={0.5}>
              <div className="space-y-3">
                {hpFormats.map((hp, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-border-subtle last:border-0 pb-2 last:pb-0"
                  >
                    <code className="font-mono text-sm text-accent-orange">
                      {hp.format}
                    </code>
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                      {hp.note}
                    </span>
                  </div>
                ))}
              </div>
            </GlowCard>

            <motion.p
              variants={fadeUp}
              className="mt-4 font-mono text-xs text-text-muted leading-relaxed"
            >
              ha.pa. = HP in Hindi. May appear on the same line
              or below the model name.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-4">
              <code className="text-[11px] font-mono text-accent-teal/70 bg-accent-teal/5 px-3 py-2 rounded block">
                {`→ {"model_name": "SWARAJ 744 FE", "horse_power": 48}`}
              </code>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
