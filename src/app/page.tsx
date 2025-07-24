import { getAllCourses } from '@/lib/courses';
import { CourseListings } from '@/components/courses/CourseListings';

export default async function HomePage() {
  const courses = await getAllCourses();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-headline text-primary">
          Welcome to Course Compass
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Your ultimate guide to navigating the world of knowledge. Find, explore, and enroll in courses that chart the course for your future.
        </p>
      </section>
      <CourseListings courses={courses} />
    </div>
  );
}
