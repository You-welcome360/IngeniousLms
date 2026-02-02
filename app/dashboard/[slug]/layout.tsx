import { ReactNode } from "react";
import { CourseSidebar } from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface iAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function CourseLayout({ children, params }: iAppProps) {
  const { slug } = await params;

  const course = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-col md:flex-row flex-1">
      {/* MAIN CONTENT */}
      <div className="order-1 md:order-2 flex-1 overflow-hidden">
        {children}
      </div>

      {/* SIDEBAR */}
      <div className="order-2 md:order-1 w-full md:w-80 border-t md:border-t-0 md:border-r border-border shrink-0">
        <CourseSidebar course={course.course} />
      </div>
    </div>
  );
}
