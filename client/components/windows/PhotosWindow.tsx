"use client";

interface PhotosWindowProps {
  data: any;
}

export default function PhotosWindow({ data }: PhotosWindowProps) {
  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-3 gap-2">
        {data?.gallery?.map((item: any) => (
          <img
            key={item.id}
            src={item.img}
            alt=""
            className="w-full h-24 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}