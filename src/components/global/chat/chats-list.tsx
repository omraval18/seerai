"use client";

import { ClientMessage } from "@/actions/actions";
import { useAIState, useUIState } from "ai/rsc";
import ChatMessage from "./chat-message";
import { useEffect } from "react";

export default function ChatList() {
    const [messages, setMessages] = useUIState();

    
    return (
        <ul className="flex flex-col">
            {messages.map((message:ClientMessage) => (
                <ChatMessage  message={message} key={message.id}/>
            ))}
        </ul>
    );
}
