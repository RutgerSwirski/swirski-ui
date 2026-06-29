import CopyToClipboard from "@/components/CopyToClipboard";

type CodeBlockProps = {
  code: string;
  className?: string;
  wrap?: boolean;
};

export default function CodeBlock({
  code,
  className = "",
  wrap = false,
}: CodeBlockProps) {
  return (
    <div
      className={`relative w-full min-w-0 max-w-full overflow-hidden border-4 border-black bg-[#0B0B0C] shadow-[5px_5px_0_#0057FF] sm:shadow-[7px_7px_0_#0057FF] ${className}`}
    >
      <pre
        className={`block max-h-164 w-full max-w-full overflow-auto p-4 pr-18 text-xs font-bold leading-6 text-white sm:p-5 sm:pr-28 sm:text-sm sm:leading-7 ${
          wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
        }`}
      >
        <code
          className={`block min-w-full ${
            wrap ? "whitespace-pre-wrap break-words" : "w-max whitespace-pre"
          }`}
        >
          {code}
        </code>
      </pre>
      <CopyToClipboard value={code} className="absolute right-3 top-3 z-10" />
    </div>
  );
}
