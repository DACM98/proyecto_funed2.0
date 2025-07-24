import type { Course } from '@/lib/types';
import { getCoursesData } from '@/lib/course-data';

export async function getAllCourses(): Promise<Course[]> {
  return getCoursesData();
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  const courses = await getCoursesData();
  return courses.find(course => course.id === id);
}
