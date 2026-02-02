import { ReactNode } from "react";
import { CourseSidebar } from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface CourseLayoutProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function CourseLayout({
  children,
  params,
}: CourseLayoutProps) {
  const { slug } = await params;

  // Server-side security + sidebar data
  const course = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-col md:flex-row flex-1 min-h-screen">
      {/* ================= MAIN CONTENT ================= */}
      <main className="order-1 md:order-2 flex-1 overflow-hidden px-4 md:px-6 lg:px-8 pb-10 md:pb-0">
        {children}
      </main>

      {/* ================= SIDEBAR ================= */}
      <aside
        className="
          order-2 md:order-1
          w-full md:w-80
          shrink-0
          border-t md:border-t-0 md:border-r border-border
          bg-muted/30 md:bg-transparent
          pt-6 md:pt-0
        "
      >
        {/* Mobile section label */}
        <div className="px-4 pb-4 md:hidden">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Course content
          </p>
        </div>

        <CourseSidebar course={course.course} />
      </aside>
    </div>
  );
}
