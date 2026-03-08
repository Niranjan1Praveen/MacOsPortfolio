"use client";

interface TxtFileWindowProps {
  data: any;
}

export default function TxtFileWindow({ data }: TxtFileWindowProps) {
  return (
    <div className="p-6 overflow-y-auto h-full">
      {data?.content?.map((para: string, idx: number) => (
        <p key={idx} className="mb-3 text-muted-foreground">{para}</p>
      ))}
    </div>
  );
}