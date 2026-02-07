"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import GlowCard from "@/components/ui/GlowCard";

const challenges = [
  {
    title: "Multi-language",
    desc: "English, Hindi, Marathi — mixed scripts on single invoices",
    accent: "teal" as const,
  },
  {
    title: "Handwritten + Printed",
    desc: "Mixed handwritten entries overlaid on pre-printed forms",
    accent: "teal" as const,
  },
  {
    title: "Non-standard Layouts",
    desc: "Wildly varying formats across hundreds of dealers",
    accent: "teal" as const,
  },
  {
    title: "Overlapping Elements",
    desc: "Signatures and stamps obscuring critical text fields",
    accent: "orange" as const,
  },
  {
    title: "Indian Number Formats",
    desc: "₹9,23,637/- — lakh-system commas, trailing separators",
    accent: "orange" as const,
  },
  {
    title: "Low Quality Scans",
    desc: "Faded ink, skewed angles, partial crops, noise",
    accent: "orange" as const,
  },
];

export default function Slide01Problem() {
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
            01 — Problem Statement
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-text-primary leading-[1.1] mb-4"
        >
          Extracting structure
          <br />
          from <span className="text-accent-orange italic">chaos</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-text-secondary font-mono text-sm md:text-base max-w-2xl mb-10 leading-relaxed"
        >
          Automatically extract structured data from tractor & asset invoice
          images — dealer name, model, horse power, cost, signatures, stamps.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {challenges.map((c, i) => (
            <GlowCard key={c.title} accent={c.accent} delay={0.3 + i * 0.08}>
              <h3 className="font-mono text-sm font-bold text-text-primary mb-1">
                {c.title}
              </h3>
              <p className="font-mono text-xs text-text-secondary leading-relaxed">
                {c.desc}
              </p>
            </GlowCard>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex items-center gap-4"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted">
            Output
          </span>
          <span className="h-px flex-1 bg-border-subtle" />
          <div className="flex gap-2">
            {["Dealer Name", "Model", "HP", "Cost", "Signature", "Stamp"].map(
              (f) => (
                <span
                  key={f}
                  className="text-[10px] font-mono px-2 py-1 rounded border border-accent-teal/20 text-accent-teal"
                >
                  {f}
                </span>
              )
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
