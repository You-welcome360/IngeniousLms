"use server";

import { requireUser } from "@/app/data/user/require-user";
import { protectEnrollmentAction } from "@/lib/action-security";
import prisma from "@/lib/db";
import { env } from "@/lib/env";
import { redirect } from "next/navigation";
import { ApiResponse } from "@/lib/types";

export async function enrollInCourseAction(
  courseId: string
): Promise<ApiResponse | never> {
  const user = await requireUser();
  let checkoutUrl: string;

  try {
    // Security protection
    const securityCheck = await protectEnrollmentAction(user.id);
    if (!securityCheck.success) {
      return {
        status: "error",
        message: securityCheck.error || "Security check failed",
      };
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: {
        id: true,
        price: true,
        slug: true,
      },
    });

    if (!course) {
      return {
        status: "error",
        message: "Course not found",
      };
    }

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
      select: {
        id: true,
        status: true,
      },
    });

    // Already enrolled → go straight to success
    if (existingEnrollment?.status === "Active") {
      checkoutUrl = `${env.BETTER_AUTH_URL}/payment/success`;
    }

    // Create or activate enrollment
    if (existingEnrollment) {
      await prisma.enrollment.update({
        where: { id: existingEnrollment.id },
        data: {
          status: "Active",
          amount: course.price,
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.enrollment.create({
        data: {
          userId: user.id,
          courseId: course.id,
          amount: course.price,
          status: "Active",
        },
      });
    }

    // Redirect to success page
    checkoutUrl = `${env.BETTER_AUTH_URL}/payment/success`;
  } catch (error) {
    console.error("Enroll error:", error);
    checkoutUrl = `${env.BETTER_AUTH_URL}/payment/cancel`;
  }
  redirect(checkoutUrl);
}
