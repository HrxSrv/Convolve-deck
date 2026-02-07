"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import GlowCard from "@/components/ui/GlowCard";

const passes = [
  {
    num: "1",
    title: "Dealer Name",
    icon: "◉",
    input: "Top header crop (YOLO detected)",
    prompt: "Focused on dealer/seller name",
    tokens: "256 max tokens",
    output: '{"dealer_name": "..."}',
    accent: "teal" as const,
  },
  {
    num: "2",
    title: "Model + HP",
    icon: "⬡",
    input: "Image excluding header",
    prompt: "4-step model ID rules + Hindi HP",
    tokens: "1000 max tokens",
    output: '{"model_name": "...", "horse_power": ...}',
    accent: "teal" as const,
  },
  {
    num: "3",
    title: "Asset Cost",
    icon: "◇",
    input: "Image excluding header",
    prompt: "Multi-lang keywords + Indian formats",
    tokens: "128 max tokens",
    output: '{"asset_cost": ...}',
    accent: "orange" as const,
  },
];

export default function Slide05ThreePass() {
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
            05 — Three-Pass Strategy
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-3"
        >
          Focused, tailored prompts
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-text-secondary font-mono text-sm max-w-2xl mb-8 leading-relaxed"
        >
          Each pass targets a single task — less noise, more precision.
          Reduces hallucination by narrowing the context window.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {passes.map((pass, i) => (
            <GlowCard key={pass.num} accent={pass.accent} delay={0.3 + i * 0.12}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-2xl ${pass.accent === "orange" ? "text-accent-orange" : "text-accent-teal"}`}>
                  {pass.icon}
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
                    Pass {pass.num}
                  </span>
                  <h3 className="font-mono text-sm font-bold text-text-primary">
                    {pass.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    Input
                  </span>
                  <p className="font-mono text-xs text-text-secondary">{pass.input}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    Prompt
                  </span>
                  <p className="font-mono text-xs text-text-secondary">{pass.prompt}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                    Tokens
                  </span>
                  <p className="font-mono text-xs text-text-secondary">{pass.tokens}</p>
                </div>
                <div className="pt-2 border-t border-border-subtle">
                  <code className="text-[10px] font-mono text-accent-teal/80 bg-accent-teal/5 px-2 py-1 rounded block">
                    {pass.output}
                  </code>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
