"use server"

import { Conversation } from "@/lib/db/conversation";

export async function fetchConversationList({ userId }: { userId: string }) {
    "use server"
    try {
        const conversation = new Conversation();
        const data = await conversation.getAllConversations({ userId });
        return {data}


    } catch (error) {
        throw error
    } 


}