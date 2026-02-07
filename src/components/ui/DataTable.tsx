"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";

interface DataTableProps {
  headers: string[];
  rows: string[][];
  accent?: "teal" | "orange";
  className?: string;
}

export default function DataTable({
  headers,
  rows,
  accent = "teal",
  className = "",
}: DataTableProps) {
  const headerBg =
    accent === "teal" ? "bg-accent-teal/10" : "bg-accent-orange/10";
  const headerText =
    accent === "teal" ? "text-accent-teal" : "text-accent-orange";
  const borderColor =
    accent === "teal" ? "border-accent-teal/15" : "border-accent-orange/15";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={`overflow-hidden rounded-lg border ${borderColor} ${className}`}
    >
      <table className="w-full text-sm font-mono">
        <thead>
          <motion.tr variants={fadeUp} className={headerBg}>
            {headers.map((h, i) => (
              <th
                key={i}
                className={`px-4 py-3 text-left font-medium ${headerText} text-xs uppercase tracking-wider`}
              >
                {h}
              </th>
            ))}
          </motion.tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <motion.tr
              key={ri}
              variants={fadeUp}
              className={`border-t ${borderColor} hover:bg-white/[0.02] transition-colors`}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 text-text-secondary text-sm"
                >
                  {cell}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
