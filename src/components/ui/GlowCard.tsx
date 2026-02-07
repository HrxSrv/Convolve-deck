"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  accent?: "teal" | "orange";
  className?: string;
  delay?: number;
}

export default function GlowCard({
  children,
  accent = "teal",
  className = "",
  delay = 0,
}: GlowCardProps) {
  const borderColor =
    accent === "teal"
      ? "border-accent-teal/20 hover:border-accent-teal/40"
      : "border-accent-orange/20 hover:border-accent-orange/40";

  const glowStyle =
    accent === "teal"
      ? { boxShadow: "var(--glow-teal)" }
      : { boxShadow: "var(--glow-orange)" };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      whileHover={{ scale: 1.01, ...glowStyle }}
      className={`relative rounded-lg border ${borderColor} bg-bg-surface/80 backdrop-blur-sm p-5 transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
