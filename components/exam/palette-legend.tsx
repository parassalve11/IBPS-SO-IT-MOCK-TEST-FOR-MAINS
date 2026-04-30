"use client";

const legendItems = [
  {
    label: "Answered",
    chipClassName: "border-emerald-500 bg-emerald-500"
  },
  {
    label: "Marked for Review",
    chipClassName: "border-blue-600 bg-blue-600"
  },
  {
    label: "Current Question",
    chipClassName: "border-blue-600 bg-white"
  },
  {
    label: "Not Attempted",
    chipClassName: "border-slate-200 bg-slate-100"
  }
];

export function PaletteLegend() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center gap-3 text-sm text-slate-700">
          <span className={`h-5 w-5 rounded-md border ${item.chipClassName}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
