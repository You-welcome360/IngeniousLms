"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Face() {
  const {data: session} = authClient.useSession();
  const router = useRouter();
  async function SignOut() {
    await authClient.signOut({
      fetchOptions:{
        onSuccess: ()=>{
          router.push("/");
          toast.success(`Sign out successfully 😒`);
        },
      },
    });
  }
  return (
    <>
    
    {session ? (
      <div className="">
        <p>{session.user.name}</p>
        <Button onClick={SignOut}>Logout</Button>
      </div>
    ):(
      <Link href={'/login'}><Button>Login</Button></Link>
    ) }
    <div className="">
      <h1>the Lord will see me through in Jesus name</h1>
      <ThemeToggle />
    </div>
    </>
  );
}
