import { db } from "./db";
import { Chat } from "@/types";
import { Message as MessageType } from "@/types";

export class Message {
    private db = db;

    async createMessage(params: {
        content: string;
        role: "user" | "ai";
        conversationId: string;
    }): Promise<string> {
        try {
            const message = await this.db.message.create({
                data: {
                    content: params.content,
                    role: params.role,
                    conversation: {
                        connect: {
                            id: params.conversationId,
                        },
                    },
                },
            });
            return message.id;
        } catch (error) {
            console.error(`Error storing ${params.role} message:`, error);
            throw error;
        }
    }

    async createManyMessages(params: {
        conversationId: string;
        userId: string;
        messages: MessageType[];
    }):Promise<void> {
        try {
            await db.message.createMany({
                data: params.messages.map((message) => ({
                    content: message.content as string,
                    conversationId:params.conversationId,
                    userId:params.userId,
                    role: message.role === "user" ? "user" : "assistant",
                })),
            });
        } catch (error) {
            console.error(`Error storing messages in ${params.conversationId}: `, error);
            throw error

        }
    }

    async getAllMessages(params: {
        conversationId: string;
        userId: string;
    }): Promise<MessageType[] | null> {
        try {
            const messages = await this.db.message.findMany({
                where: {
                    conversationId: params.conversationId,
                    userId: params.userId,
                },
                select: {
                    role: true,
                    content: true,
                    id: true,
                },
            });

            return messages as MessageType[];
        } catch (error) {
            console.error("Error retrieving messages:", error);
            throw error;
        }
    }

    async getMessageById(params: { messageId: string }): Promise<Chat | null> {
        try {
            const message = await this.db.message.findUnique({
                where: {
                    id: params.messageId,
                },
            });
            return message;
        } catch (error) {
            console.error("Error getting message:", error);
            throw error;
        }
    }

    async updateMessageContent(params: {
        messageId: string;
        newContent: string;
    }): Promise<Chat | null> {
        try {
            const updatedMessage = await this.db.message.update({
                where: { id: params.messageId },
                data: { content: params.newContent },
            });
            return updatedMessage;
        } catch (error) {
            console.error("Error updating message content:", error);
            throw error;
        }
    }

    async deleteMessage(params: { messageId: string }): Promise<void> {
        try {
            await this.db.message.delete({
                where: { id: params.messageId },
            });
        } catch (error) {
            console.error("Error deleting message:", error);
            throw error;
        }
    }
}
