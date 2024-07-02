import { createClient } from "./client";



export async function getUser() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return user;
    }
}
