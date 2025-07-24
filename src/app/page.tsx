import { getAllCourses } from '@/lib/courses';
import { CourseListings } from '@/components/courses/CourseListings';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function HomePage() {
  const courses = await getAllCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    Fundación Educativa de Desarrollo y Formación Integral
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Educación a tu Alcance. Ofrecemos cursos de vanguardia para que destaques.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#courses"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Ver Cursos
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Inscríbete ahora
                  </Link>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="600"
                height="400"
                alt="Hero"
                data-ai-hint="education foundation"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section id="courses" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:py-12">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Nuestros Cursos</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">Descubre tu Potencial</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Desde maquillaje y cuidado de la piel hasta peluquería y diseño de uñas, nuestros programas están diseñados para darte las habilidades que necesitas.
                        </p>
                    </div>
                </div>
                <CourseListings courses={courses} />
            </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary">
                Mantente al día con tu progreso
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Accede a tus notas y al feedback de los instructores para seguir mejorando.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                 <Link href="/login">Consulta tus Notas</Link>
               </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
