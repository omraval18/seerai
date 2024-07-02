import { createClient } from "./server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";



export async function getUserOnServer() {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (user?.id) {
        return user
    }
    
}