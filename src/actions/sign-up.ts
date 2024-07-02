"use server"
import { db } from "@/lib/db/db";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUpWithEmail(formData: FormData) {
    "use server"
    const supabase = createClient();

    const userData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };


    const { data, error } = await supabase.auth.signUp(userData);
    
    


    if (error) {
        return {message: error.message};
        
    }

    revalidatePath("/", "layout");
    redirect("/");
}
