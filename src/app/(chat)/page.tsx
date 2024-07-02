import { AI } from "@/actions/actions";
import Chat from "@/components/global/chat/chat";

import { getUserOnServer } from "@/lib/supabase/user";
import { User } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";

export default async function Home() {
    const id = nanoid();
    const user = await getUserOnServer();

    if (!user) {
        redirect("/sign-in");
    }

  return (
      <>
          <AI initialAIState={{ chatId: id, messages: [] }}>
              <Chat id={id} user={user as User} />
          </AI>
      </>
  );
}
