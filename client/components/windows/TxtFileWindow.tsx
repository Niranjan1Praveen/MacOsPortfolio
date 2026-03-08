"use client";

interface TxtFileWindowProps {
  data: any;
}

export default function TxtFileWindow({ data }: TxtFileWindowProps) {
  return (
    <div className="p-6 overflow-y-auto h-full">
      <h2 className="text-xl font-bold mb-4">{data?.title || "Text File"}</h2>
      {data?.content?.map((para: string, idx: number) => (
        <p key={idx} className="mb-3 text-gray-700">{para}</p>
      ))}
    </div>
  );
}