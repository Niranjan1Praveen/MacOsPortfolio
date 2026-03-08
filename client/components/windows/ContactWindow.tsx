"use client";

import Image from "next/image";

interface ContactWindowProps {
  data: any;
}

export default function ContactWindow({ data }: ContactWindowProps) {
  // Vibrant colors for each social card
  const cardColors = [
    "bg-[#f4656b]", // Github - pinkish red
    "bg-[#4bcb63]", // Platform - green
    "bg-[#ff866b]", // Twitter/X - orange
    "bg-[#05b6f6]", // LinkedIn - blue
  ];

  return (
    <div className="p-6 h-full overflow-y-auto">
      {/* Header with profile image */}
      <div className="flex flex-col  gap-4 mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <Image
            src="/images/adrian.jpg"
            alt="Profile"
            width={84}
            height={84}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-1">Let's Connect</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            I'm always open to new opportunities, collaborations, or just a chat
            about tech and AI. Feel free to reach out through any of the
            platforms below!
          </p>
        </div>
      </div>

      {/* Social Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.socials?.map((social: any, index: number) => (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardColors[index]} rounded-xl p-5 text-white hover:scale-[1.02] transition-transform duration-200 shadow-lg`}
            style={{ backgroundColor: social.bg }}
          >
            <div className="flex items-start justify-between mb-4">
              <Image
                src={social.icon}
                alt={social.text}
                width={32}
                height={32}
                className="brightness-0 invert"
              />
              <svg
                className="w-5 h-5 opacity-70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-1">{social.text}</h3>
              <p className="text-sm opacity-80">Connect with me →</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
