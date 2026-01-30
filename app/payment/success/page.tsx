/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/public/STUDENT.json"

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { CheckIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function PaymentSuccessfull() {
  const { triggerConfetti } = useConfetti();

  const WAIT_SECONDS = 30;
  const [timeLeft, setTimeLeft] = useState(WAIT_SECONDS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    triggerConfetti();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setReady(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {/* Animation / Icon */}
          <div className="flex justify-center">
            {!ready ? (
              <Lottie
                animationData={animationData}
                loop
                className="h-40"
              />
            ) : (
              <CheckIcon className="size-14 p-3 bg-green-500/20 text-green-600 rounded-full" />
            )}
          </div>

          {/* Text */}
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">
              {ready ? "Your course is ready 🎉" : "Preparing your course"}
            </h2>

            <p className="text-sm mt-2 text-muted-foreground text-balance">
              {ready
                ? "Everything is set. You can now access your course."
                : "Please wait while we set things up for you."}
            </p>

            {!ready && (
              <p className="mt-3 text-sm font-medium text-primary">
                Redirect available in {timeLeft}s
              </p>
            )}

            {/* Action Button */}
            <Link
              href="/dashboard"
              className={clsx(
                buttonVariants({ className: "w-full mt-6" }),
                !ready && "pointer-events-none opacity-50"
              )}
            >
              Go to Dashboard
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
