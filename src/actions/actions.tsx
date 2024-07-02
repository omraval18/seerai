"use server";

import { createAI, createStreamableValue, getAIState, getMutableAIState, streamUI } from "ai/rsc";
import React, { ReactNode } from "react";
import { nanoid } from "nanoid";
import { model } from "@/lib/ai";
import { getUserOnServer } from "@/lib/supabase/user";
import { Conversation } from "@/lib/db/conversation";
import { Message } from "@/types";
import { Message as MessageClient } from "@/lib/db/message";
import BotMessage from "@/components/global/chat/bot-message";


export interface ClientMessage {
    id: string;
    role: "user" | "assistant";
    display: ReactNode;
}


export interface AIState {
    chatId: string;
    messages: Message[]
}



export async function continueConversation(input: string): Promise<ClientMessage> {
    "use server";

    const user = await getUserOnServer();
    const history = getMutableAIState();
    let textStream: undefined | ReturnType<typeof createStreamableValue<string>>;
      let textNode: undefined | React.ReactNode;

    const userMessage: Message = {
        id: nanoid(),
        role: "user",
        content: input,
    };

    history.update({
        ...history.get(),
        messages: [...(history.get().messages as Message[]), userMessage],
    });

    const result = await streamUI({
        model,
        messages: [...(history.get().messages as Message[])],
        text: async ({ content, done,delta }) => {
            if (!textStream) {
                textStream = createStreamableValue("");
                textNode = <BotMessage message={textStream.value} />;
            }
            if (done) {
                const assistantMessage: Message = {
                    id: nanoid(),
                    role: "assistant",
                    content,
                };

                history.done({
                    ...history.get(),
                    messages: [...(history.get().messages as Message[]), assistantMessage],
                });

                // Save messages to the database
                if (user && user.id) {
                    const conversationId = history.get().chatId;
                    const userId = user.id;

                    // Check if the conversation exists
                    const conversation = new Conversation();
                    const res = await conversation.getConversationById({ conversationId, userId });
                    const message = new MessageClient()
                    if (!res) {
                        // Create a new conversation if it doesn't exist
                        const firstMessageContent = userMessage.content as string;
                        const name = firstMessageContent.substring(0, 50);
                        const newConversation = new Conversation()

                        await newConversation.createConversation({ name, userId, id: conversationId });
                    }

                    const chatData = {
                        conversationId,
                        userId,
                        messages: [userMessage, assistantMessage],
                    };

                    message.createManyMessages(chatData).catch((error) => {
                        console.error("Error saving messages:", error);
                    });
                }
            } else {
                textStream.update(delta);
            }

            return textNode;
        },
    });

    

    return {
        id: nanoid(),
        role: "assistant",
        display: result.value ,
    };
}

export const AI = createAI<AIState, ClientMessage[]>({
    actions: {
        continueConversation,
    },
    initialAIState: { chatId: nanoid(), messages: [] },
    initialUIState: [],
    onGetUIState: async (): Promise<ClientMessage[] | undefined> => {
        "use server";

        const user = await getUserOnServer();

        if (user?.id) {
            const aiState = getAIState();

            if (aiState) {
                const uiState = getUIStateFromAIState(aiState);
                return uiState as ClientMessage[];
            }
        } else {
            return;
        }
    }
});

export const getUIStateFromAIState = (aiState: AIState) => {
    return aiState.messages
        .map((message, index) => ({
            id: `${aiState.chatId}-${index}`,
            role: message.role,
            display: message.content as string,
            key: `${aiState.chatId}-${index}`,
        }));
};