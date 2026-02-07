"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import GlowCard from "@/components/ui/GlowCard";

const keywords = [
  { lang: "English", terms: ['"Grand Total"', '"Total"', '"Net Amount"'] },
  { lang: "Hindi", terms: ['"kul yog"', '"kul"'] },
  { lang: "Marathi", terms: ['"ekun"'] },
];

const numberExamples = [
  { input: "9,23,637", output: "923,637", note: "Lakh format" },
  { input: "11,06,506", output: "1,106,506", note: "Above 10L" },
  { input: "4,50,000=00", output: "450,000", note: "With paisa" },
  { input: "9,23,637/-", output: "923,637", note: "Trailing /-" },
];

export default function Slide08Cost() {
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
            08 — Pass 3: Asset Cost
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-8"
        >
          Indian number format <span className="text-accent-orange italic">decoding</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Keywords */}
          <div>
            <motion.h3
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4"
            >
              Multi-language Keywords
            </motion.h3>

            {keywords.map((k, i) => (
              <GlowCard key={k.lang} accent="teal" delay={0.3 + i * 0.08} className="mb-3">
                <div className="flex items-start gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted w-16 flex-shrink-0 pt-0.5">
                    {k.lang}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {k.terms.map((t) => (
                      <code
                        key={t}
                        className="text-xs font-mono text-accent-teal bg-accent-teal/5 px-2 py-0.5 rounded"
                      >
                        {t}
                      </code>
                    ))}
                  </div>
                </div>
              </GlowCard>
            ))}

            <motion.div variants={fadeUp} className="mt-6">
              <GlowCard accent="orange" delay={0.6}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent-orange">⚠</span>
                  <span className="font-mono text-xs font-bold text-accent-orange">
                    Sanity Check
                  </span>
                </div>
                <p className="font-mono text-xs text-text-secondary leading-relaxed">
                  Tractors cost 3–15 lakh. If result &gt; 20 lakh, likely misread
                  <code className="text-accent-orange mx-1">/-</code> as digits.
                </p>
              </GlowCard>
            </motion.div>
          </div>

          {/* Number format examples */}
          <div>
            <motion.h3
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4"
            >
              Number Format Conversion
            </motion.h3>

            <GlowCard accent="teal" delay={0.4}>
              <div className="space-y-0">
                {numberExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 py-3 border-b border-border-subtle last:border-0"
                  >
                    <code className="font-mono text-sm text-text-muted w-28 text-right line-through decoration-text-muted/30">
                      {ex.input}
                    </code>
                    <span className="text-accent-teal text-xs">→</span>
                    <code className="font-mono text-sm text-accent-teal font-bold">
                      {ex.output}
                    </code>
                    <span className="font-mono text-[10px] text-text-muted ml-auto">
                      {ex.note}
                    </span>
                  </div>
                ))}
              </div>
            </GlowCard>

            <motion.div variants={fadeUp} className="mt-4">
              <code className="text-[11px] font-mono text-accent-teal/70 bg-accent-teal/5 px-3 py-2 rounded block">
                {`→ {"asset_cost": 923637}`}
              </code>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
