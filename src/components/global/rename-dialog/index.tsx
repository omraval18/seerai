"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil } from "lucide-react";
import { renameConversation } from "@/actions/rename-conversation";

type RenameDialogProps = {
    userId: string;
    chatId: string;
    name: string;
};

export function RenameDialog({ userId, chatId, name }: RenameDialogProps) {
    const [newName, setNewName] = useState(name);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleRename(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            await renameConversation({conversationId:chatId, newName,userId});
            setIsOpen(false);
            setLoading(false);
            
        } catch (error) {
            console.error("Error updating conversation name:", error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Pencil
                    size={18}
                    strokeWidth={1.5}
                    className="text-gray-400 hover:text-white transition-colors duration-100 ease-in-out"
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rename Chat</DialogTitle>
                    <DialogDescription>
                        Make changes to your Existing Conversation Name Here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleRename}
                        disabled={loading}
                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Save changes"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
