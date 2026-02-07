"use client";

import { motion } from "framer-motion";
import { drawLine, nodeReveal } from "@/lib/animations";

interface FlowNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  accent?: "teal" | "orange";
  width?: number;
}

interface FlowEdge {
  from: string;
  to: string;
}

interface FlowChartProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  width?: number;
  height?: number;
  className?: string;
}

export default function FlowChart({
  nodes,
  edges,
  width = 900,
  height = 500,
  className = "",
}: FlowChartProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <motion.svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full h-auto ${className}`}
      initial="hidden"
      animate="visible"
    >
      <defs>
        <filter id="glow-teal">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#00D4AA" floodOpacity="0.3" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-orange">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood floodColor="#FF6B35" floodOpacity="0.3" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#00D4AA" opacity="0.6" />
        </marker>
      </defs>

      {/* Edges */}
      {edges.map((edge, i) => {
        const from = nodeMap.get(edge.from);
        const to = nodeMap.get(edge.to);
        if (!from || !to) return null;

        const fromW = from.width || 160;
        const toW = to.width || 160;
        const x1 = from.x + fromW / 2;
        const y1 = from.y + 40;
        const x2 = to.x + toW / 2;
        const y2 = to.y;

        const midY = (y1 + y2) / 2;
        const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

        return (
          <motion.path
            key={`edge-${i}`}
            d={d}
            fill="none"
            stroke="#00D4AA"
            strokeWidth={1.5}
            strokeOpacity={0.4}
            markerEnd="url(#arrowhead)"
            variants={drawLine}
            custom={i}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const w = node.width || 160;
        const accentColor =
          node.accent === "orange" ? "#FF6B35" : "#00D4AA";
        const filterRef =
          node.accent === "orange" ? "url(#glow-orange)" : "url(#glow-teal)";

        return (
          <motion.g
            key={node.id}
            variants={nodeReveal}
            custom={i}
            filter={filterRef}
          >
            <rect
              x={node.x}
              y={node.y}
              width={w}
              height={40}
              rx={6}
              fill="#12121a"
              stroke={accentColor}
              strokeWidth={1}
              strokeOpacity={0.4}
            />
            <text
              x={node.x + w / 2}
              y={node.y + (node.sublabel ? 18 : 24)}
              textAnchor="middle"
              fill="#e8e4df"
              fontSize={11}
              fontFamily="var(--font-jetbrains-mono), monospace"
            >
              {node.label}
            </text>
            {node.sublabel && (
              <text
                x={node.x + w / 2}
                y={node.y + 32}
                textAnchor="middle"
                fill="#9a9690"
                fontSize={9}
                fontFamily="var(--font-jetbrains-mono), monospace"
              >
                {node.sublabel}
              </text>
            )}
          </motion.g>
        );
      })}
    </motion.svg>
  );
}
