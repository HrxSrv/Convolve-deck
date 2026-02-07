"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import FlowChart from "@/components/ui/FlowChart";

const nodes = [
  { id: "input", label: "Invoice Image", x: 370, y: 0, accent: "teal" as const },
  { id: "preprocess", label: "Preprocessing", sublabel: "RGB + LANCZOS", x: 370, y: 65, accent: "teal" as const },
  { id: "yolo", label: "YOLO Layout", sublabel: "Header Detection", x: 370, y: 130, accent: "orange" as const },
  { id: "pass1", label: "Pass 1: Dealer", sublabel: "Top header crop", x: 100, y: 210, accent: "teal" as const },
  { id: "pass2", label: "Pass 2: Model+HP", sublabel: "Excluding header", x: 370, y: 210, accent: "teal" as const },
  { id: "pass3", label: "Pass 3: Cost", sublabel: "Excluding header", x: 640, y: 210, accent: "teal" as const },
  { id: "rtdetr1", label: "RT-DETR Sig", sublabel: "Signature bbox", x: 220, y: 295, accent: "orange" as const },
  { id: "rtdetr2", label: "RT-DETR Stamp", sublabel: "Stamp bbox", x: 520, y: 295, accent: "orange" as const },
  { id: "postprocess", label: "Post-Processing", sublabel: "JSON + Validation", x: 370, y: 375, accent: "teal" as const },
  { id: "output", label: "Structured JSON", x: 370, y: 445, accent: "teal" as const },
];

const edges = [
  { from: "input", to: "preprocess" },
  { from: "preprocess", to: "yolo" },
  { from: "yolo", to: "pass1" },
  { from: "yolo", to: "pass2" },
  { from: "yolo", to: "pass3" },
  { from: "pass1", to: "rtdetr1" },
  { from: "pass3", to: "rtdetr2" },
  { from: "rtdetr1", to: "postprocess" },
  { from: "rtdetr2", to: "postprocess" },
  { from: "pass2", to: "postprocess" },
  { from: "postprocess", to: "output" },
];

export default function Slide02Architecture() {
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
            02 — Architecture
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl text-text-primary leading-tight mb-2"
        >
          Multi-pass self-validated pipeline
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-text-secondary font-mono text-sm max-w-2xl mb-6 leading-relaxed"
        >
          Not fine-tuning — we build focused passes atop a leading lightweight VLM,
          each narrowing the context window for maximum precision.
        </motion.p>

        <motion.div variants={fadeUp}>
          <FlowChart
            nodes={nodes}
            edges={edges}
            width={900}
            height={490}
            className="max-h-[55vh]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
