"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function signInWithGoogle() {
    const supabase = createClient();

    const { data,error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: "http://localhost:3000/api/google/callback",
        },
    });


    if (error) {
        redirect("/error");
    }

    return redirect(data.url);
}


