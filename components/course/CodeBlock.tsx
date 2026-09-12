type CodeBlockProps = {
  code: string;
  label?: string;
};

export default function CodeBlock({ code, label }: CodeBlockProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0F151C] overflow-hidden my-6">
      {label && (
        <div className="px-4 py-2 border-b border-white/10 text-[11px] font-mono text-[#a0aec0]">
          {label}
        </div>
      )}
      <pre className="px-5 py-4 overflow-x-auto">
        <code className="font-mono text-[12px] leading-relaxed text-[#e2e8f0] whitespace-pre">
        {code}
        </code>
      </pre>
    </div>
  );
}