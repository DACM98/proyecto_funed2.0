import fs from 'fs/promises';
import path from 'path';
import type { Course } from '@/lib/types';
import { cache } from 'react';

const getCoursesData = cache(async (): Promise<Course[]> => {
  const filePath = path.join(process.cwd(), 'src', 'data', 'courses.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData) as Course[];
  } catch (error) {
    console.error("Failed to read or parse courses.json:", error);
    return [];
  }
});

export async function getAllCourses(): Promise<Course[]> {
  return getCoursesData();
}

export async function getCourseById(id: string): Promise<Course | undefined> {
  const courses = await getCoursesData();
  return courses.find(course => course.id === id);
}
