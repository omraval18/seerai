"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db/db";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/";

    if (code) {
        const cookieStore = cookies();
        const supabase = createClient();
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (data.user?.id) {
            const user = await db.user.findUnique({
                where: {
                    id: data.user.id,
                },
            });
            
            if (!user) {
                await db.user.create({
                    data: {
                        id: data.user.id,
                    },
                });

            }
        }
        
        if (!error && data.session) {
            // Store the session data in cookies
            cookieStore.set("supabase-auth-token", data.session.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: data.session.expires_in,
            });
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}


// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url);
//     const code = searchParams.get("code");

//     console.log(request.url);

//     return NextResponse.json({ result: "hello", code });
// }

