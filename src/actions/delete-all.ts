'use server'

import { db } from "@/lib/db/db";


export async function deleteAllChats(userId: string) {
    try {
        await db.message.deleteMany({
            where: {
                conversation: {
                    userId: userId,
                },
            },
        });

        // Step 2: Delete all conversations associated with the user
        await db.conversation.deleteMany({
            where: {
                userId: userId,
            },
        });
    } catch (error) {

        throw new Error("Failed to delete all Your Messages! ")
        
    }
}