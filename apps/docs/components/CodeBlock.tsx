import CopyToClipboard from "@/components/CopyToClipboard";

type CodeBlockProps = {
  code: string;
  className?: string;
};

export default function CodeBlock({ code, className = "" }: CodeBlockProps) {
  return (
    <div
      className={`relative border-4 border-black bg-[#0B0B0C] shadow-[7px_7px_0_#0057FF] ${className}`}
    >
      <CopyToClipboard
        value={code}
        className="absolute right-3 top-3 z-10"
      />

      <pre className="overflow-x-auto p-5 pr-28 text-sm font-bold leading-7 text-white">
        <code>{code}</code>
      </pre>
    </div>
  );
}
