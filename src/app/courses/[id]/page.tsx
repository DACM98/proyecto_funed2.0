'use client';

import { useEffect, useState } from 'react';
import { getCourseById } from '@/lib/courses';
import type { Course } from '@/lib/types';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SuggestedCourses } from '@/components/courses/SuggestedCourses';
import { User, Clock, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

type CoursePageProps = {
  params: {
    id: string;
  };
};

function CourseDetails({ course }: { course: Course | undefined }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // This state is briefly hit before the redirect, show loader to prevent content flash
    return (
       <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    notFound();
  }
  
  return (
     <div className="container mx-auto px-4 py-8 md:py-12">
       <div className="mb-6 p-4 rounded-md bg-primary/10 border border-primary/20 text-primary flex items-center gap-3">
          <AlertTriangle className="h-5 w-5" />
          <p className="font-medium text-sm">
            Esta es una página protegida. Solo los estudiantes autenticados pueden ver esta página.
          </p>
        </div>

      <article>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Badge variant="secondary" className="mb-2">{course.category}</Badge>
            <h1 className="text-4xl font-bold font-headline mb-4 text-primary">{course.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-accent" />
                <span>Instructor: {course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span>Duración: {course.duration} horas</span>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-foreground">
              <p>{course.description}</p>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src={course.image}
                alt={course.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={course['data-ai-hint']}
              />
            </div>
          </div>
        </div>
      </article>

      <SuggestedCourses courseName={course.title} />
    </div>
  )
}


export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseById(params.id);
  
  if (!course) {
    notFound();
  }

  return <CourseDetails course={course} />;
}
