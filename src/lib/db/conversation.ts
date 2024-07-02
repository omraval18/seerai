import { db } from "./db";
import { Conversation as ConversationType, Chat } from "@/types";

export class Conversation {
    private db = db;

    async createConversation({
        name,
        userId,
        id,
    }: {
        name: string;
        userId: string;
        id: string;
    }): Promise<ConversationType | null> {
        try {
            const conversation = await this.db.conversation.create({
                data: {
                    name: name,
                    id: id,
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
            return conversation;
        } catch (error) {
            console.error("Error creating new conversation:", error);
            throw error;
        }
    }

    async createManyMessages({
        conversationId,
        userId,
        messages,
    }: {
        conversationId: string;
        userId: string;
        messages: Chat[];
    }): Promise<void> {
        await this.db.message.createMany({
            data: messages.map((message) => ({
                content: message.content,
                conversationId,
                userId,
                role: message.role,
            })),
        });
    }

    async getConversationById({
        conversationId,
        userId,
    }: {
        conversationId: string;
        userId: string;
    }): Promise<ConversationType | null> {
        try {
            const conversation = await this.db.conversation.findUnique({
                where: {
                    id: conversationId,
                    userId,
                },
                include: {
                    messages: true,
                },
            });
            return conversation;
        } catch (error) {
            console.error("Error getting conversation:", error);
            throw error;
        }
    }

    async getAllConversations({ userId }: { userId: string }): Promise<ConversationType[] | null> {
        try {
            const conversations = await this.db.conversation.findMany({
                where: {
                    userId: userId,
                },
                orderBy: {
                    createdAt: "desc", // Sorted by Time to get Recents Ones First
                },
                include: {
                    messages: true, // Include associated messages
                },
            });
            return conversations;
        } catch (error) {
            console.error("Error fetching conversation list:", error);
            throw error;
        }
    }

    async updateConversationName({
        conversationId,
        newName,
        userId,
    }: {
        conversationId: string;
        newName: string;
        userId: string;
    }): Promise<ConversationType | null> {
        try {
            const updatedConversation = await this.db.conversation.update({
                where: { id: conversationId, userId },
                data: { name: newName },
            });
            return updatedConversation;
        } catch (error) {
            throw error;
        }
    }

    async deleteConversation({
        id,
        userId,
        name,
    }: {
        id: string;
        userId: string;
        name: string;
    }): Promise<void> {
        try {
            await this.db.message.deleteMany({
                where: {
                    conversationId: id,
                },
            });

            await this.db.conversation.deleteMany({
                where: {
                    id,
                    userId,
                    name,
                },
            });
        } catch (error) {
            console.error("Error deleting conversation:", error);
            throw error;
        }
    }
}
