'use client';

import { useEffect, useState } from 'react';
import type { Course } from '@/lib/types';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SuggestedCourses } from '@/components/courses/SuggestedCourses';
import { User, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';


// Este es un Client Component que renderiza la UI y maneja la interactividad.
export function CourseDetails({ course }: { course: Course | undefined }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


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
    // Este estado se alcanza brevemente antes de la redirección, se muestra el loader para evitar el parpadeo del contenido
    return (
       <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  const handleEnroll = async () => {
    setIsSubmitting(true);
    // Simulación de una llamada a la API
    // En una aplicación real, aquí llamarías a tu backend para inscribir al usuario.
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsEnrolled(true);
    setIsSubmitting(false);

    toast({
      title: '¡Inscripción Exitosa!',
      description: `Te has inscrito correctamente en el curso "${course.title}".`,
    });
  };
  
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
            <div className="prose prose-lg max-w-none text-foreground mb-8">
              <p>{course.description}</p>
            </div>
            
            {isEnrolled ? (
              <Button size="lg" disabled className="bg-green-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                Ya estás inscrito
              </Button>
            ) : (
              <Button size="lg" onClick={handleEnroll} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Inscríbete Ahora
              </Button>
            )}

          </div>
          <div className="md:col-span-1">
            <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src={course.image}
                alt={course.title}
                fill
                style={{objectFit: 'cover'}}
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
