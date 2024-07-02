"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import deleteConversation from "@/actions/delete-conversation";
import removeChat from "@/actions/delete-conversation";

type RenameDialogProps = {
    userId: string;
    chatId: string;
    name: string;
};

export function DeleteDialog({ userId, chatId, name }: RenameDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleRename(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            await removeChat({ id: chatId, userId, name });
            setIsOpen(false);
            setLoading(false);
        } catch (error) {
            console.error("Error updating conversation name:", error);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Trash2
                    size={18}
                    strokeWidth={1.5}
                    className="text-gray-400 hover:text-white transition-colors duration-100 ease-in-out"
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] py-8 px-4 flex flex-col gap-8">
                <DialogHeader className="flex flex-col gap-2">
                    <DialogTitle>Do you want to Permanently Delete This Chat?</DialogTitle>
                    <DialogDescription>
                        This will permanently delete your chat message and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleRename}
                        disabled={loading}
                        variant={"destructive"}
                        className="w-full sm:w-auto flex items-center justify-center px-4 py-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            "Delete"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
