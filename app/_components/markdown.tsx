import ReactMarkdown from "react-markdown";

export default function Markdown({
  source,
  size,
}: {
  source: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <ReactMarkdown
      className={`markdown markdown-invert ${
        size ? `markdown-${size}` : ""
      } text-gray-400 markdown-img:rounded-lg `}
      components={{
        a(props) {
          const { children, node, title, ...rest } = props;
          if (title) {
            const match = /glossary-(\d+)/.exec(title || "");
            if (match) {
              return (
                <span data-tooltip-id={title} {...rest} className="italic">
                  {children}
                </span>
              );
            }
          }

          return <span {...rest}>{children}</span>;
        },
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
