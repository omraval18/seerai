"use client"
import React, { useEffect, useState } from 'react'
import ChatList from './chats-list';
import { PromptForm } from '../prompt-form';
import { User } from '@supabase/supabase-js';
import { usePathname, useRouter } from 'next/navigation';
import { useAIState, useUIState } from 'ai/rsc';
import { useLocalStorage } from '@/lib/hooks/use-local-storage';


export type ChatProps = {
    id: string,  
    user:User
}
export default function Chat({ id,user }: ChatProps) {
    const [input, setInput] = useState("");
    const path = usePathname();
    const [messages] = useUIState();
    const [aiState] = useAIState();
    const router = useRouter()
    const [chatId, setChatId] = useLocalStorage<string|null>("seerId", null); 


    useEffect(() => {
          if (user?.id) {
              if (!path.includes("chat") && messages.length === 1) {
                  window.history.replaceState({}, "", `/chat/${id}`);
                  setChatId(id);
              }
          }
    }, [id, path, user?.id, messages]);

    

    useEffect(() => {
        if (path.includes("chat")) {
            const messagesLength = aiState.messages?.length;
            if (messagesLength === 2) {
                router.refresh();
            }
        }
    }, [aiState.messages, router]);
    
  return (
      <main className="w-full h-auto mb-28 px-5   ">
          <div className="mx-auto sm:max-w-2xl sm:px-4">
              <ChatList />
          </div>
          <div className="mx-auto sm:max-w-2xl sm:px-4 fixed inset-x-0 bottom-0">
              <div className="sticky bottom-0 z-40 space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
                  <PromptForm input={input} setInput={setInput} />
              </div>
          </div>
      </main>
  );
}
