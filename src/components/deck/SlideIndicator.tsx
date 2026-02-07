"use client";

import { motion } from "framer-motion";

interface SlideIndicatorProps {
  total: number;
  current: number;
  onNavigate: (index: number) => void;
}

export default function SlideIndicator({
  total,
  current,
  onNavigate,
}: SlideIndicatorProps) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          aria-label={`Go to slide ${i + 1}`}
          className="group relative flex items-center justify-center w-4 h-4"
        >
          <motion.div
            className="rounded-full"
            animate={{
              width: i === current ? 8 : 4,
              height: i === current ? 8 : 4,
              backgroundColor:
                i === current ? "var(--accent-teal)" : "var(--text-muted)",
              opacity: i === current ? 1 : 0.4,
            }}
            whileHover={{ opacity: 0.8, scale: 1.3 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      ))}
      <span className="mt-3 text-[10px] font-mono text-text-muted">
        {String(current + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
