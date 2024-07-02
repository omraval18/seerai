"use client"
import { ClientMessage } from '@/actions/actions';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { CodeBlock } from '../code-block';
import { MemoizedReactMarkdown } from '../markdown';
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";



export interface ChatMessageProps {
    message: ClientMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
    const currentDate = new Date();
    const shortDate = currentDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
    });


    
    


  return (
      <div className="max-w-2xl px-4 py-4 bg-muted/30 mb-4 rounded-lg flex gap-4 items-start">
          <Avatar className="w-8 h-8">
              <AvatarImage
                  src={
                      message.role === "user"
                          ? "https://api.dicebear.com/8.x/notionists-neutral/svg?seed=George"
                          : "https://api.dicebear.com/8.x/bottts/svg?seed=Buddy"
                  }
                  alt="User"
              />
              <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
              <p className="text-xs text-white/80">{shortDate}</p>
              {message.role === "user" ? (
                  <p>{message.display}</p>
              ) : React.isValidElement(message.display) ? (
                  message.display
              ) : (
                  <MemoizedReactMarkdown
                      className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                      remarkPlugins={[remarkGfm, remarkMath]}
                      components={{
                          pre: ({ node, className, children, ...props }) => (
                              <pre className={className} {...props}>
                                  {children}
                              </pre>
                          ),
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
                          p({ children }) {
                              return <div className="mb-2 last:mb-0">{children}</div>;
                          },
                      }}
                  >
                      {message.display as string}
                  </MemoizedReactMarkdown>
              )}{" "}
          </div>
      </div>
  );
}
