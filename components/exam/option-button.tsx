"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type OptionButtonProps = {
  option: string;
  selected: boolean;
  onSelect: (option: string) => void;
};

function splitOption(option: string) {
  const match = option.match(/^([A-Z])\.\s*(.*)$/);

  if (!match) {
    return {
      prefix: "-",
      body: option
    };
  }

  return {
    prefix: match[1],
    body: match[2]
  };
}

export function OptionButton({ option, selected, onSelect }: OptionButtonProps) {
  const parts = splitOption(option);

  return (
    <motion.button
      whileTap={{ scale: 0.995 }}
      type="button"
      onClick={() => onSelect(option)}
      aria-pressed={selected}
      className={cn(
        "flex w-full items-center gap-3 border-b border-slate-200 px-4 py-3.5 text-left transition last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset",
        selected ? "bg-blue-50/70" : "bg-white hover:bg-slate-50"
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
          selected
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-slate-300 bg-white text-transparent"
        )}
      />
      <span className="min-w-6 text-lg font-semibold text-slate-900">{parts.prefix}.</span>
      <span className="text-[15px] leading-7 text-slate-800">{parts.body}</span>
    </motion.button>
  );
}
