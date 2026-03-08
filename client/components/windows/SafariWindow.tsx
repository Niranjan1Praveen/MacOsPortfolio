"use client";

import Image from "next/image";
import Link from "next/link";

interface SafariWindowProps {
  data: any;
}

export default function SafariWindow({ data }: SafariWindowProps) {
  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden">

      {/* Content */}
      <div className="p-10 overflow-y-auto">
        <h1 className="text-pink-500 text-2xl font-bold mb-8">
          My Developer Blog
        </h1>

        <div className="flex flex-col gap-10">
          {data?.posts?.map((post: any) => (
            <div key={post.id} className="flex gap-6 items-start">

              {/* Text */}
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">{post.date}</span>

                <h3 className="text-lg font-semibold max-w-2xl">
                  {post.title}
                </h3>

                <Link href={post.link} className="text-blue-500 text-sm flex items-center gap-2">
                  Check out the full post →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}