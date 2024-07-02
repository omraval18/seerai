"use client";
import { useTransition, useEffect } from "react";
import { Logout } from "@/actions/logout";
import { Button } from "../../ui/button";
import { Loader2 } from "lucide-react";

export default function SignOut() {
    let [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (isPending) return;
    }, [isPending]);

    const handleLogout = async () => {
        startTransition(() => {
            Logout();
        });
    };

    return (
        
            <Button
                type="submit"
                variant={"destructive"}
                className="text-white bg-rose-700 hover:bg-rose-800 transition duration-100 ease-in-out"
                disabled={isPending}
                onClick={handleLogout}
            >
                {isPending ? (
                    <div className="flex items-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <p>Logging out</p>
                    </div>
                ) : (
                    "Logout"
                )}
            </Button>
    );
}
