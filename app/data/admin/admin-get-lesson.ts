import "server-only";
import { notFound } from "next/navigation";
import { requireTeacherOrAdmin } from "./require-role";
import prisma from "@/lib/db";

export async function adminGetLesson(id: string) {
  await requireTeacherOrAdmin();

  const data = await prisma.lesson.findUnique({
    where: {
      id: id,
    },
    select: {
      title: true,
      videoKey: true,
      thumbnailKey: true,
      description: true,
      id: true,
      position: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>;
