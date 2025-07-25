'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, User, BookOpen, CheckCircle, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Grade } from '@/lib/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useCourses } from '@/context/CourseContext';


type DashboardClientProps = {
  grades: Grade[];
}

export function DashboardClient({ grades }: DashboardClientProps) {
  const { user, loading: authLoading } = useAuth();
  const { enrolledCourses, loading: coursesLoading } = useCourses();
  const router = useRouter();
  const loading = authLoading || coursesLoading;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">
          Bienvenido a tu panel, {user.displayName?.split(' ')[0] || 'Estudiante'}!
        </h1>
        <p className="text-muted-foreground text-lg">Aquí puedes ver tu progreso y tus calificaciones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-8">

          {/* Cursos Inscritos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="text-accent" />
                <span>Mis Cursos Inscritos</span>
              </CardTitle>
               <CardDescription>Cursos en los que estás participando actualmente.</CardDescription>
            </CardHeader>
            <CardContent>
              {enrolledCourses.length > 0 ? (
                <div className="space-y-6">
                  {enrolledCourses.map(course => (
                    <div key={course.id} className="p-4 border rounded-lg bg-card/50">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                        </div>
                         <Badge variant={course.status === 'completado' ? 'default' : 'secondary'} className="w-fit mt-2 sm:mt-0">
                          {course.status === 'completado' ? <CheckCircle className="mr-1.5 h-3 w-3" /> : null}
                           {course.status === 'completado' ? 'Completado' : 'En Progreso'}
                        </Badge>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                          <span>Progreso</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} aria-label={`${course.progress}% de progreso en ${course.title}`}/>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">Aún no te has inscrito a ningún curso.</p>
              )}
            </CardContent>
          </Card>

          {/* Calificaciones Recientes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="text-accent" />
                <span>Mis Calificaciones</span>
              </CardTitle>
              <CardDescription>Resumen de tus notas y feedback de los instructores.</CardDescription>
            </CardHeader>
            <CardContent>
              {grades.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Curso</TableHead>
                      <TableHead className="text-center">Nota</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Feedback</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map(grade => (
                      <TableRow key={grade.id}>
                        <TableCell className="font-medium">{grade.courseName}</TableCell>
                        <TableCell className="text-center">
                           <Badge variant={grade.score >= 70 ? 'default' : 'destructive'}>{grade.score}</Badge>
                        </TableCell>
                        <TableCell>{format(new Date(grade.date), 'd LLL, yyyy', { locale: es })}</TableCell>
                         <TableCell className="text-muted-foreground">{grade.feedback}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground text-center py-4">Aún no tienes calificaciones registradas.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Columna lateral */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="text-accent" />
                <span>Mi Perfil</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Nombre</h4>
                <p className="text-muted-foreground">{user.displayName}</p>
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
               <div>
                <h4 className="font-semibold">Miembro desde</h4>
                <p className="text-muted-foreground">{user.metadata.creationTime ? format(new Date(user.metadata.creationTime), 'd MMMM, yyyy', { locale: es }) : 'N/A'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
