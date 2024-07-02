import { AI } from '@/actions/actions';
import Chat from '@/components/global/chat/chat';
import { getUserOnServer } from '@/lib/supabase/user';
import { User } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import React from 'react'
import { Message } from '@/lib/db/message';
import { Message as MessageType } from '@/types';


interface PageProps {
    params: {
        id: string;
    };
    
}

export default async function MessagePage({params}:PageProps) {
    const conversationId = params.id?.toString();
    const user = await getUserOnServer();
    const message = new Message()
    const chat = await message.getAllMessages({ conversationId, userId: user?.id as string})
    
    if (!user) {
        redirect("/sign-in")
    }


    if (!chat || chat.length === 0) {
        return
    }

    const messages:MessageType[] = chat.map((message) => ({
        id: message.id,
        content: message.content,
        role: message.role === "user" ? "user" : "assistant",
    }));



  return (
      <>
          <AI initialAIState={{ chatId: conversationId, messages }}>
              <Chat id={conversationId} user={user as User} />
          </AI>
      </>
  );
}
