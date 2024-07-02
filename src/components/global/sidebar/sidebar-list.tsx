import { cache, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarItem from "./sidebar-item";

import { useParams } from "next/navigation";
import { Conversation } from "@/lib/db/conversation";

type SidebarList = {
    userId: string;
};

const loadChats = cache(async (userId?: string) => {
    const conversation = new Conversation();
    
    if (userId) {
        return await conversation.getAllConversations({ userId });
    }
    return null;
});

type ChatList = {
    id: string;
    name: string;
}[];

export async function SidebarList({ userId }: SidebarList) {
    const chats = await loadChats(userId);

    return (
        <ScrollArea className="h-[80%] w-full rounded-md">
            <div className="p-4">
                {chats?.map((chat) => (
                    <>
                        <SidebarItem
                            key={chat.id}
                            name={chat.name as string}
                            id={chat.id as string}
                            userId={userId}
                        />
                    </>
                ))}
            </div>
        </ScrollArea>
    );
}
