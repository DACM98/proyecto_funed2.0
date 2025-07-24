import type { Course } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Tag } from 'lucide-react';

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={course.image}
            alt={course.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={course['data-ai-hint']}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="mb-2 text-xl font-headline leading-tight">
          <Link href={`/courses/${course.id}`} className="hover:text-primary transition-colors">
            {course.title}
          </Link>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <User className="w-4 h-4 mr-2" />
          <span>{course.instructor}</span>
        </div>
        <Badge variant="secondary" className="flex items-center w-fit">
          <Tag className="w-3 h-3 mr-1.5" />
          {course.category}
        </Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/courses/${course.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
