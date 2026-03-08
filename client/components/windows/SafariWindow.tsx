"use client";

interface SafariWindowProps {
  data: any;
}

export default function SafariWindow({ data }: SafariWindowProps) {
  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Articles</h2>
      <div className="grid gap-4">
        {data?.posts?.map((post: any) => (
          <div key={post.id} className="border rounded p-3">
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}