"use server"

import { Conversation } from "@/lib/db/conversation";

type Params = {
    conversationId: string;
    userId: string;
};
export async function fetchConversation({ conversationId, userId }: Params) {
    "use server"

    try {
        const conversation = new Conversation()
        const data = await conversation.getConversationById({ conversationId, userId })
        return {data}
        
    } catch (error) {
        throw error
    }
}