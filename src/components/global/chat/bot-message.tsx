"use client"
import { useStreamableText } from '@/lib/hooks/use-streamable-text';
import { StreamableValue } from 'ai/rsc';
import React from 'react'
import { MemoizedReactMarkdown } from '../markdown';
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CodeBlock } from '../code-block';
import {Options} from 'react-markdown';
export default function BotMessage({ message }: { message: string | StreamableValue<string> }) {
    const text = useStreamableText(message);

    return (
        <MemoizedReactMarkdown
            className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
                p({ children }) {
                    return <div className="mb-2 last:mb-0">{children}</div>;
                },
                code({ className, children, ...props }) {
                  

                    const match = /language-(\w+)/.exec(className || "");

                    return (
                        <CodeBlock
                            key={Math.random()}
                            language={(match && match[1]) || ""}
                            value={String(children).replace(/\n$/, "")}
                            {...props}
                        />
                    );
                },
            }}
        >
            {text}
        </MemoizedReactMarkdown>
    );
}
