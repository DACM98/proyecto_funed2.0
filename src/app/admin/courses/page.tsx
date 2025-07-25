
import { getAllCourses } from '@/lib/courses';
import { CourseManagementClient } from '@/components/admin/CourseManagementClient';

export default async function AdminCoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <CourseManagementClient courses={courses} />
    </div>
  );
}
