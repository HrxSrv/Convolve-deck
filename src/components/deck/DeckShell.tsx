"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slideVariants, slideTransition } from "@/lib/animations";
import SlideIndicator from "./SlideIndicator";

import Slide01Problem from "@/components/slides/Slide01Problem";
import Slide02Architecture from "@/components/slides/Slide02Architecture";
import Slide03Models from "@/components/slides/Slide03Models";
import Slide04Preprocessing from "@/components/slides/Slide04Preprocessing";
import Slide05ThreePass from "@/components/slides/Slide05ThreePass";
import Slide06DealerName from "@/components/slides/Slide06DealerName";
import Slide07ModelHP from "@/components/slides/Slide07ModelHP";
import Slide08Cost from "@/components/slides/Slide08Cost";
import Slide09Detection from "@/components/slides/Slide09Detection";
import Slide10PostProcessing from "@/components/slides/Slide10PostProcessing";
import Slide11Result from "@/components/slides/Slide11Result";
import Slide12Failures from "@/components/slides/Slide12Failures";

const slides = [
  Slide01Problem,
  Slide02Architecture,
  Slide03Models,
  Slide04Preprocessing,
  Slide05ThreePass,
  Slide06DealerName,
  Slide07ModelHP,
  Slide08Cost,
  Slide09Detection,
  Slide10PostProcessing,
  Slide11Result,
  Slide12Failures,
];

export default function DeckShell() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);

  const navigate = useCallback(
    (next: number) => {
      if (isAnimating.current) return;
      if (next < 0 || next >= slides.length) return;
      isAnimating.current = true;
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
      setTimeout(() => {
        isAnimating.current = false;
      }, 650);
    },
    [current]
  );

  const goNext = useCallback(() => {
    navigate(current + 1);
  }, [current, navigate]);

  const goPrev = useCallback(() => {
    navigate(current - 1);
  }, [current, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          goNext();
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          goPrev();
          break;
        case "Home":
          e.preventDefault();
          navigate(0);
          break;
        case "End":
          e.preventDefault();
          navigate(slides.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, navigate]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) {
        if (delta > 0) goNext();
        else goPrev();
      }
    },
    [goNext, goPrev]
  );

  const CurrentSlide = slides[current];

  return (
    <div
      className="relative h-screen w-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="absolute inset-0 h-screen w-screen"
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      <SlideIndicator
        total={slides.length}
        current={current}
        onNavigate={navigate}
      />

      {/* Slide label */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-muted">
          Convolve 4.0
        </span>
        <span className="w-8 h-px bg-text-muted/30" />
        <span className="text-[10px] font-mono text-text-muted">
          IDFC First Bank
        </span>
      </div>
    </div>
  );
}
