'use client';

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      components={{
        // Headings
        h1: ({ node, ...props }) => (
          <h1 className="text-3xl font-bold mt-10 mb-6 pb-2 border-b border-gray-200 dark:border-gray-800" {...props} />
        ),
        h2: ({ node, ...props }) => (
          <h2 className="text-2xl font-bold mt-8 mb-4" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-xl font-bold mt-6 mb-3" {...props} />
        ),
        h4: ({ node, ...props }) => (
          <h4 className="text-lg font-bold mt-4 mb-2" {...props} />
        ),
        
        // Paragraphs
        p: ({ node, ...props }) => (
          <p className="my-5 leading-relaxed text-gray-700 dark:text-gray-300" {...props} />
        ),
        
        // Custom component for line breaks
        br: ({ node, ...props }) => (
          <br {...props} />
        ),
        
        // Code blocks
        code({ node, inline, className, children, ...props }: { node?: any; inline?: boolean; className?: string; children?: React.ReactNode; [key: string]: any }) {
          const match = /language-(\w+)/.exec(className || "");
          
          if (!inline && match) {
            const codeString = String(children).replace(/\n$/, "");
            
            return (
              <div className="my-6 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md">
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-mono text-gray-600 dark:text-gray-400">
                    {match[1]}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(codeString);
                      // You could add toast notification here
                    }}
                    className="text-xs px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto bg-gray-50 dark:bg-gray-900 m-0">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          }
          
          // Inline code
          return (
            <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-gray-800 dark:text-gray-200" {...props}>
              {children}
            </code>
          );
        },
        
        // Blockquotes
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-600 dark:text-gray-400" {...props} />
        ),
        
        // Lists
        ul: ({ node, ...props }) => (
          <ul className="my-5 ml-6 list-disc space-y-2" {...props} />
        ),
        ol: ({ node, ...props }) => (
          <ol className="my-5 ml-6 list-decimal space-y-2" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="pl-2" {...props} />
        ),
        
        // Images
        img: ({ node, ...props }) => (
          <div className="my-8 text-center">
            <img 
              className="rounded-lg shadow-md max-w-full h-auto mx-auto" 
              {...props} 
              alt={props.alt || "Blog image"}
            />
            {props.alt && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
                {props.alt}
              </p>
            )}
          </div>
        ),
        
        // Tables
        table: ({ node, ...props }) => (
          <div className="my-8 overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden" {...props} />
          </div>
        ),
        th: ({ node, ...props }) => (
          <th className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b font-semibold text-left" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-4 py-3 border-b border-gray-200 dark:border-gray-700" {...props} />
        ),
        
        // Links
        a: ({ node, ...props }) => (
          <a 
            className="text-primary hover:underline font-medium" 
            target="_blank" 
            rel="noopener noreferrer"
            {...props} 
          />
        ),
        
        // Horizontal Rule
        hr: ({ node, ...props }) => (
          <hr className="my-10 border-t border-gray-200 dark:border-gray-800" {...props} />
        ),
        
        // Task lists (from remark-gfm)
        input: ({ node, ...props }) => {
          if (props.type === 'checkbox') {
            return (
              <input 
                type="checkbox" 
                className="mr-2 rounded border-gray-300 dark:border-gray-700" 
                {...props} 
              />
            );
          }
          return <input {...props} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
