"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface CodeBlockProps {
  code: string;
  language?: string;
  highlights?: Record<string, string>;
  className?: string;
  delay?: number;
}

function colorize(
  line: string,
  highlights?: Record<string, string>
): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;

  // JSON-style coloring
  // Keys in quotes
  remaining = line;
  const regex =
    /("[\w_]+")\s*:|(".*?")|(\btrue\b|\bfalse\b|\bnull\b)|(\b\d+\.?\d*\b)|(\/\/.*$)|([\{\}\[\]:,])/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++}>{line.slice(lastIndex, match.index)}</span>
      );
    }
     
    if (match[1]) {
      // JSON key
      const isHighlighted =
        highlights && Object.keys(highlights).some((h) => match!.includes(h));
      parts.push(
        <span
          key={key++}
          className={isHighlighted ? "text-accent-orange font-bold" : "text-accent-teal"}
        >
          {match[1]}
        </span>
      );
      parts.push(<span key={key++}>:</span>);
      lastIndex = regex.lastIndex;
      continue;
    } else if (match[2]) {
      // String value
      parts.push(
        <span key={key++} className="text-green-400">
          {match[2]}
        </span>
      );
    } else if (match[3]) {
      // Boolean/null
      parts.push(
        <span key={key++} className="text-purple-400">
          {match[3]}
        </span>
      );
    } else if (match[4]) {
      // Number
      parts.push(
        <span key={key++} className="text-accent-orange">
          {match[4]}
        </span>
      );
    } else if (match[5]) {
      // Comment
      parts.push(
        <span key={key++} className="text-text-muted italic">
          {match[5]}
        </span>
      );
    } else if (match[6]) {
      // Braces, brackets, colons, commas
      parts.push(
        <span key={key++} className="text-text-muted">
          {match[6]}
        </span>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    parts.push(<span key={key++}>{line.slice(lastIndex)}</span>);
  }

  return parts.length > 0 ? parts : [<span key={0}>{line}</span>];
}

export default function CodeBlock({
  code,
  language = "json",
  highlights,
  className = "",
  delay = 0,
}: CodeBlockProps) {
  const lines = code.split("\n");

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={`rounded-lg border border-border-subtle bg-[#0d0d14] overflow-hidden ${className}`}
    >
      {language && (
        <div className="flex items-center px-4 py-2 border-b border-border-subtle">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono">
            {language}
          </span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="font-mono">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="inline-block w-8 text-right mr-4 text-text-muted/40 select-none text-xs leading-relaxed">
                {i + 1}
              </span>
              <span>{colorize(line, highlights)}</span>
            </div>
          ))}
        </code>
      </pre>
    </motion.div>
  );
}
