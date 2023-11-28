import ReactMarkdown from "react-markdown";

export default function Markdown({ source }: { source: string }) {
  return (
    <ReactMarkdown
      className="markdown"
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
