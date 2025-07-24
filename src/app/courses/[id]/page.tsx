import { getCourseById } from '@/lib/courses';
import { notFound } from 'next/navigation';
import { CourseDetails } from '@/components/courses/CourseDetails';

type CoursePageProps = {
  params: {
    id: string;
  };
};

// Este es un Server Component. Obtiene los datos y los pasa al componente de cliente.
export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseById(params.id);

  if (!course) {
    notFound();
  }

  // Pasamos los datos del curso al componente de cliente para que los renderice.
  return <CourseDetails course={course} />;
}
