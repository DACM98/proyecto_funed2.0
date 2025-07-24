// src/app/api/suggest-courses/route.ts
import { NextResponse } from 'next/server';
import { suggestComplementaryCourses } from '@/ai/flows/suggest-complementary-courses';

export async function POST(request: Request) {
  try {
    const { courseName } = await request.json();

    if (!courseName) {
      return NextResponse.json({ success: false, error: 'El nombre del curso es obligatorio.' }, { status: 400 });
    }

    const result = await suggestComplementaryCourses({ courseName });
    if (result && result.suggestedCourses) {
      return NextResponse.json({ success: true, courses: result.suggestedCourses });
    }
    
    return NextResponse.json({ success: false, error: 'No se pudieron recuperar las sugerencias.' }, { status: 500 });

  } catch (error) {
    console.error('Error getting suggested courses:', error);
    return NextResponse.json({ success: false, error: 'Ocurrió un error inesperado al obtener las sugerencias.' }, { status: 500 });
  }
}
