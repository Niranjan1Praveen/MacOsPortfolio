"use client";

interface TerminalWindowProps {
  data: any;
}

export default function TerminalWindow({ data }: TerminalWindowProps) {
  return (
    <div className="p-4 h-full overflow-y-auto bg-black text-green-400 font-mono">
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      {data?.techStack?.map((category: any, i: number) => (
        <div key={i} className="mb-4">
          <p className="text-white">{category.category}:</p>
          <p className="ml-4">{category.items.join(" • ")}</p>
        </div>
      ))}
    </div>
  );
}