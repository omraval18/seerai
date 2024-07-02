'use server'

import { Conversation } from "@/lib/db/conversation";
import { revalidatePath } from "next/cache";

export async function renameConversation(params:{conversationId:string,newName:string,userId:string}) {
    "use server"
    try {

        const conversation = new Conversation();
        await conversation.updateConversationName({ conversationId:params.conversationId, newName:params.newName, userId:params.userId });
        
    } catch (error) {
       throw error 
    }
    
    revalidatePath(`/chat/${params.conversationId}`);
    
}