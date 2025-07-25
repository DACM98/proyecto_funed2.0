import { getAllCourses } from '@/lib/courses';
import { CourseListings } from '@/components/courses/CourseListings';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
  const courses = await getAllCourses();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Fundación Educativa de Desarrollo y Formación Integral
                </h1>
                <p className="max-w-[600px] mx-auto text-primary-foreground/80 md:text-xl">
                  Educación a tu Alcance. Explora nuestros cursos de vanguardia.
                </p>
              </div>
              <div className="flex justify-center">
                <Link
                  href="#courses"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary-foreground px-8 text-lg font-medium text-primary shadow transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Ver Cursos Disponibles
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Course Listings Section */}
        <section id="courses" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Nuestra Oferta Educativa</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Programas diseñados para darte las habilidades que necesitas para destacar en el mundo profesional.
                        </p>
                    </div>
                </div>
                <CourseListings courses={courses} />
            </div>
        </section>
      </main>
    </div>
  );
}
