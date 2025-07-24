// This is a server-side file.
'use server';

import { suggestComplementaryCourses } from '@/ai/flows/suggest-complementary-courses';

export async function getSuggestedCourses(courseName: string): Promise<{ success: boolean; courses?: string[]; error?: string; }> {
  try {
    const result = await suggestComplementaryCourses({ courseName });
    if (result && result.suggestedCourses) {
      return { success: true, courses: result.suggestedCourses };
    }
    return { success: false, error: 'Could not retrieve suggestions.' };
  } catch (error) {
    console.error('Error getting suggested courses:', error);
    return { success: false, error: 'An unexpected error occurred while fetching suggestions.' };
  }
}
