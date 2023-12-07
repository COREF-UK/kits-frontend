import ReactMarkdown from "react-markdown";

export default function Markdown({
  source,
  size,
  isLightMode,
}: {
  source: string;
  size?: "sm" | "lg" | "xl" | "2xl";
  isLightMode?: boolean;
}) {
  const markdownClass = `max-w-max markdown markdown-${size ?? "base"} ${
    isLightMode ?? false ? "" : "markdown-invert text-gray-400"
  } markdown-img:rounded-lg`;
  return (
    <ReactMarkdown
      className={markdownClass}
      components={{
        a(props) {
          const { children, node, title, ...rest } = props;
          if (title) {
            const match = /glossary-(\d+)/.exec(title);
            if (match) {
              return (
                <span
                  data-tooltip-id={title}
                  {...rest}
                  className="italic whitespace-nowrap"
                >
                  {children}
                </span>
              );
            }
          }

          return <a {...rest}>{children}</a>;
        },
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
