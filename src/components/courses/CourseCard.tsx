import type { Course } from '@/lib/types';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Tag } from 'lucide-react';

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-primary bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-headline leading-tight text-primary">
          <Link href={`/courses/${course.id}`} className="hover:underline">
            {course.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-grow">
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-2 text-accent" />
            <span>Tipo: {course.category}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-accent" />
            <span>Duración: {course.duration} horas</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild size="sm" className="w-full">
          <Link href={`/courses/${course.id}`}>
            Ver Más Detalles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
