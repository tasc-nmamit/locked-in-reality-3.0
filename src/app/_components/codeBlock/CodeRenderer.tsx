import { CodeBlock } from "react-code-block";
import { cn } from "~/lib/utils";

export function CodeRenderBlock({
  code,
  language,
  className,
}: {
  code: string;
  language: string;
  className?: string;
}) {
  return (
    <CodeBlock code={code} language={language}>
      <CodeBlock.Code
        className={cn("rounded bg-slate-800 p-2 font-semibold", className)}
      >
        <div className="table-row">
          <CodeBlock.LineNumber className="table-cell select-none pr-4 text-right text-sm text-gray-500" />
          <CodeBlock.LineContent className="table-cell">
            <CodeBlock.Token />
          </CodeBlock.LineContent>
        </div>
      </CodeBlock.Code>
    </CodeBlock>
  );
}
