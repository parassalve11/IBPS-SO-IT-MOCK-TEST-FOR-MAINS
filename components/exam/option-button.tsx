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
      prefix: "•",
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
        "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        selected
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold",
          selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
        )}
      >
        {parts.prefix}
      </span>
      <span className="pt-1 text-sm leading-6 text-slate-700">{parts.body}</span>
    </motion.button>
  );
}
