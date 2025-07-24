// This file is server-side only.
import fs from 'fs/promises';
import path from 'path';
import type { Course } from '@/lib/types';
import { cache } from 'react';

// This is a placeholder function to simulate fetching data.
// In a real application, you would fetch this from your database.
export const getCoursesData = cache(async (): Promise<Course[]> => {
  const filePath = path.join(process.cwd(), 'src', 'data', 'courses.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    // We'll map the schedule property from the old format to the new duration property
    return (JSON.parse(jsonData) as any[]).map(course => ({
      ...course,
      id: course.id,
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      category: course.category,
      duration: course.duration, // duration is now a number
      image: course.image,
      'data-ai-hint': course['data-ai-hint'],
    }));
  } catch (error) {
    console.error("Failed to read or parse courses.json:", error);
    return [];
  }
});
