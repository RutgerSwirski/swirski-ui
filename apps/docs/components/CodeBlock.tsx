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
      <pre className="block max-h-128 max-w-full overflow-auto whitespace-pre p-5 pr-20 text-sm font-bold leading-7 text-white sm:pr-28">
        <code className="block min-w-max whitespace-pre">{code}</code>
      </pre>
      <CopyToClipboard value={code} className="absolute right-3 top-3 z-10" />
    </div>
  );
}
