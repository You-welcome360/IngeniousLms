"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { IconBrandGoogle } from "@tabler/icons-react";
import { Balloon, GithubIcon, Loader, Loader2, Send } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react"
import { toast } from "sonner"


const LoginForm = () => {
   const [githubPending, startGithubTransition] = useTransition()
   const [emailPending, startEmailTransition] = useTransition()
   const [googlePending, startGoogleTransition] = useTransition()
   const [email, setEmail] = useState('');
   const router = useRouter();
   async function signInWithGithub() {
        startGithubTransition(async () => {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed in with Github🎉🐱‍🏍, you will be redirected...")
                    },
                    onError: (error) => {
                        toast.error(error.error.message)
                    },
                },
            });
        })
    }

    function SignInWithEmail() {
        startEmailTransition( async ()=>{
        await authClient.emailOtp.sendVerificationOtp({
            email: email,
            type: 'sign-in',
            fetchOptions: {
                onSuccess: ()=>{
                    toast.success("Email sent🐱‍🏍");
                    router.push(`/verify-request?email=${email}`)
                },
                onError: ()=>{
                    toast.error('Error sending verification token')
                }
            }
        })
            
        })
    }

    function SignInWithGoogle() {
        startGoogleTransition(async () => {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed in with Google🎉🐱‍🏍, you will be redirected...")
                    },
                    onError: (error) => {
                        toast.error(error.error.message)
                    },
                },
            });
        })
    }

  return (
      <Card>
            <CardHeader>
                <CardTitle className="text-xl">Welcome Back!</CardTitle>
                <CardDescription>Login with your Github or Email Account</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-5">
                    <Button
                    disabled={githubPending}
                    onClick={SignInWithGoogle} className="w-full" variant={'outline'}>
                    {googlePending ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            <Balloon className="size-4 animate-bounce" />
                        </>
                    ) : (
                        <>
                            <IconBrandGoogle className="size-4" />
                            Sign In with Google
                        </>
                    )}
                </Button>

                <Button
                    disabled={githubPending}
                    onClick={signInWithGithub} className="w-full" variant={'outline'}>
                    {githubPending ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            <Balloon className="size-4 animate-bounce" />
                        </>
                    ) : (
                        <>
                            <GithubIcon className="size-4" />
                            Sign In with Github
                        </>
                    )}
                </Button>
                </div>

                <div className="relative text-center text-sm after:absolute after:inset-0
             after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-card px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>

                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        value={email}
                        required
                        onChange={(e)=> setEmail(e.target.value)}
                        type="email" placeholder="example@mail.com" />
                    </div>

                    <Button 
                    disabled={emailPending}
                    onClick={SignInWithEmail}>
                        {emailPending ? (
                            <>
                            <Loader2 className="size-4 animate-spin" />
                            <span className="animate-pulse">Loading...</span>
                            </>
                        ):(
                            <>
                            <Send className="size-4" />
                            <span>Continue with Email</span>
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
  )
}

export default LoginForm