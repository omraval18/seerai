"use client";
import * as React from "react";
import Textarea from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {Plus } from "lucide-react";
import { useActions, useUIState } from "ai/rsc";
import { ClientMessage, continueConversation } from "@/actions/actions";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
export function PromptForm({
    input,
    setInput,
}: {
    input: string;
    setInput: (value: string) => void;
    }) {
    
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const [_, setMessages] = useUIState();
    const { continueConversation } = useActions();
    

    
    
    return (
        <form
            onSubmit={async (e: any) => {
                e.preventDefault();

                // Blur focus on mobile
                if (window.innerWidth < 600) {
                    e.target["message"]?.blur();
                }

                const value = input.trim();
                setInput("");
                if (!value) return;

                setMessages((currentConversation: ClientMessage[]) => [
                    ...currentConversation,
                    { id: nanoid(), role: "user", display: input },
                ]);

                // Submit and get response message
                const responseMessage = await continueConversation(value);
                setMessages((currentMessages: ClientMessage[]) => [
                    ...currentMessages,
                    responseMessage,
                ]);
            }}
        >
            <TooltipProvider>
                <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={"/"}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
                                >
                                    <Plus />
                                    <span className="sr-only">New Chat</span>
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>New Chat</TooltipContent>
                    </Tooltip>
                    <Textarea
                        ref={inputRef}
                        tabIndex={0}
                        placeholder="Send a message."
                        className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                        spellCheck={false}
                        autoComplete="off"
                        autoCorrect="off"
                        name="message"
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="absolute right-0 top-[13px] sm:right-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={input === ""}
                                    className="bg-[#bdef0b]"
                                >
                                    <ArrowUp />
                                    <span className="sr-only">Send message</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Send message</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </TooltipProvider>
        </form>
    );
}
