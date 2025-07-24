import { getCourseById, getAllCourses } from '@/lib/courses';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SuggestedCourses } from '@/components/courses/SuggestedCourses';
import { User, Calendar, Tag, AlertTriangle } from 'lucide-react';

type CoursePageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map(course => ({
    id: course.id,
  }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getCourseById(params.id);

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
       <div className="mb-6 p-4 rounded-md bg-primary/10 border border-primary/20 text-primary flex items-center gap-3">
          <AlertTriangle className="h-5 w-5" />
          <p className="font-medium text-sm">
            This is a protected page. In a real app, you would be redirected to login if not authenticated.
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
                <Calendar className="w-5 h-5 text-accent" />
                <span>Schedule: {course.schedule}</span>
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
  );
}
