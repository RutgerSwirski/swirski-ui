import CopyToClipboard from "@/components/CopyToClipboard";

type CodeBlockProps = {
  code: string;
  className?: string;
};

export default function CodeBlock({ code, className = "" }: CodeBlockProps) {
  return (
    <div
      className={`relative w-full min-w-0 max-w-full border-4 border-black bg-[#0B0B0C] shadow-[7px_7px_0_#0057FF] ${className}`}
    >
      <CopyToClipboard
        value={code}
        className="absolute right-3 top-3 z-10"
      />

      <pre className="block max-w-full whitespace-pre-wrap break-words p-5 pr-20 text-sm font-bold leading-7 text-white [overflow-wrap:anywhere] sm:pr-28">
        <code className="block min-w-0 whitespace-pre-wrap">{code}</code>
      </pre>
    </div>
  );
}
