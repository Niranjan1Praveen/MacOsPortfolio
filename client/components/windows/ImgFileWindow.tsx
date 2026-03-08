"use client";

interface ImgFileWindowProps {
  data: any;
}

export default function ImgFileWindow({ data }: ImgFileWindowProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <img
        src={data?.imageUrl}
        alt={data?.title || "Image"}
        className="max-w-full max-h-[80%] object-contain rounded-lg"
      />
      <p className="mt-4 text-sm text-gray-600">{data?.title}</p>
    </div>
  );
}