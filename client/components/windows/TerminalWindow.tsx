"use client";

import { FlagIcon } from "lucide-react";

interface TerminalWindowProps {
  data: any;
}

export default function TerminalWindow({ data }: TerminalWindowProps) {
  // Calculate stats
  const totalCategories = data?.techStack?.length || 0;
  const loadedCategories = totalCategories; // Assuming all are loaded
  const percentage =
    totalCategories > 0
      ? Math.round((loadedCategories / totalCategories) * 100)
      : 0;

  return (
    <div className="p-4 h-full overflow-y-auto font-mono text-sm">
      {/* Prompt line */}
      <div className="mb-4">
        <span>@niranjan</span>
        <span> % </span>
        <span>show tech stack</span>
      </div>

      {/* Header */}
      <div className="mb-3">
        <span>Category</span>
        <span className="ml-32">Technologies</span>
      </div>

      {/* Separator */}
      <hr className="py-2 border-t border-dotted border-gray-400" />

      {/* Tech Stack Items */}
      {data?.techStack?.map((category: any, i: number) => (
        <div key={i} className="mb-2">
          <div className="flex">
            <span className="w-32 text-green-400">✔ {category.category}</span>
            <span>{category.items.join(", ")}</span>
          </div>
        </div>
      ))}

      {/* Empty line */}
      <div className="my-2"></div>

      {/* Status line */}
      <div className="mb-1 text-green-400">
        ✔ {loadedCategories} of {totalCategories} stacks loaded successfully (
        {percentage}%)
      </div>

      {/* Render time */}
      <div className="flex items-center gap-1 py-2">
        <FlagIcon className="w-3.5 h-3.5" />
        <span>Render time: 2ms</span>
      </div>
    </div>
  );
}
