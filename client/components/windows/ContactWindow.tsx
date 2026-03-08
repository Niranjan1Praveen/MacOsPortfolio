"use client";

interface ContactWindowProps {
  data: any;
}

export default function ContactWindow({ data }: ContactWindowProps) {
  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Contact</h2>
      <div className="space-y-4">
        {data?.socials?.map((social: any) => (
          <a
            key={social.id}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded"
          >
            <img src={social.icon} alt={social.text} className="w-6 h-6" />
            <span>{social.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}