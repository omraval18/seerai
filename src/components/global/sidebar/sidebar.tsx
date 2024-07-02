import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {SidebarList} from "./sidebar-list";
import { getUserOnServer } from "@/lib/supabase/user";
import { MessageCircle } from "lucide-react";

type SidebarProps = {
    userId:string
}

export async function Sidebar() {
    const user = await getUserOnServer();

    if (!user) {
        return;
    }
     

    return (
        <Sheet defaultOpen={false}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    className="flex gap-1 rounded-lg bg-orange-200 hover:bg-orange-300 ease-in-out transition-colors duration-100"
                >
                    <MessageCircle className="w-5 h-5" color="black" />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-80 p-0">
                <SheetHeader className="p-6">
                    <SheetTitle>Previous Conversations</SheetTitle>
                    <SheetDescription>
                        Make changes to your Chat History here.
                    </SheetDescription>
                </SheetHeader>
                <SidebarList userId={user?.id} />
            </SheetContent>
        </Sheet>
    );
}
