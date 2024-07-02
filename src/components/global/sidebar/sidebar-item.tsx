"use client"
import React from 'react'
import { DeleteIcon, MessageCircle, MessageSquareMore, Pencil, Share2, Trash, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { RenameDialog } from '../rename-dialog';
import { DeleteDialog } from '../delete-dialog';

type SidebarItemProps = {
    name: string,
    id: string,
    userId:string,
}

export default function SidebarItem({ name, id,userId }: SidebarItemProps) {
    const params = useParams();
    const chatId = params?.id?.toString()
    
  return (
      <Link href={`/chat/${id}`}>
          <div
              className={cn(
                  "text-sm flex justify-between items-center max-w-full mb-2 text-left px-4 py-3 rounded-lg border-none gap-2",
                  {
                      "bg-muted/90": chatId === id,
                      "hover:bg-muted/40": !(chatId === id),
                  }
              )}
          >
              <div className="flex justify-center items-center gap-2">
                  <MessageCircle size={18} strokeWidth={1.5} className="text-gray-400" />
                  <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {name.substring(0, 25)}
                  </div>
              </div>
              {chatId === id && (
                  <div className="flex items-center gap-2">
                      <RenameDialog userId={userId} chatId={id} name={name} />
                      <DeleteDialog userId={userId} chatId={id} name={name} />
                  </div>
              )}
          </div>
      </Link>
  );
}
