import { Sidebar } from '../sidebar/sidebar'
import Image from 'next/image'
import SignOut from '../sign-out';
import { getUserOnServer } from '@/lib/supabase/user'


export default async function Header() {
  const user = await getUserOnServer();
  let isUser = true
  if (!user) {
    isUser = false;
  }

  return (
      <header className="w-full flex justify-between px-5 py-2">
          <div>
              <Image src="/logo.svg" width={75} height={75} alt="logo" />
          </div>
          <div className="flex gap-2 items-center">
              {isUser && <SignOut />}
              <Sidebar />
          </div>
      </header>
  );
}
