"use server"

import { Conversation } from "@/lib/db/conversation";
import { revalidatePath } from "next/cache";

export default async function removeChat({ id, userId, name }: { id: string; userId: string; name: string }) {
    "use server";

    try {
        const conversation = new Conversation();
        await conversation.deleteConversation({ id, userId, name });
    } catch (error) {
        throw error;
    }

    revalidatePath(`/`);
}