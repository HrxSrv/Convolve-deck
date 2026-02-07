"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import GlowCard from "@/components/ui/GlowCard";

const steps = [
  {
    num: "01",
    title: "RGB Conversion",
    desc: '.convert("RGB") — prevents crashes from RGBA/palette PNGs',
    code: "image = image.convert('RGB')",
  },
  {
    num: "02",
    title: "Large Image Cap",
    desc: "Max 6.3M pixels (3072×2048). Area-based proportional downscale with LANCZOS resampling — sharpest for text.",
    code: "MAX_PIXELS = 3072 * 2048  # 6.3M",
  },
  {
    num: "03",
    title: "Independent Processor",
    desc: "Bypasses unsloth's default 512px resize. Uses Qwen's native smart_resize aligned to 28px patches.",
    code: "min_pixels=200704, max_pixels=1003520",
  },
  {
    num: "04",
    title: "YOLO Layout Mapping",
    desc: "Custom-trained YOLO model splits image into HEADER + Body sections for focused extraction passes.",
    code: "header, body = yolo_split(image)",
  },
];

export default function Slide04Preprocessing() {
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
            04 — Image Preprocessing
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-3"
        >
          Before any model sees the image
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-text-secondary font-mono text-sm max-w-2xl mb-10"
        >
          Format preprocessing + focus area defaulting — maximize signal, minimize noise.
        </motion.p>

        <div className="relative">
          {/* Vertical connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-teal/40 via-accent-teal/20 to-transparent origin-top hidden md:block"
          />

          <div className="space-y-4">
            {steps.map((step, i) => (
              <GlowCard key={step.num} accent="teal" delay={0.3 + i * 0.1}>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-accent-teal/30 flex items-center justify-center">
                    <span className="text-accent-teal font-mono text-xs font-bold">
                      {step.num}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono text-sm font-bold text-text-primary mb-1">
                      {step.title}
                    </h3>
                    <p className="font-mono text-xs text-text-secondary leading-relaxed mb-2">
                      {step.desc}
                    </p>
                    <code className="text-[11px] font-mono text-accent-teal/80 bg-accent-teal/5 px-2 py-1 rounded">
                      {step.code}
                    </code>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
