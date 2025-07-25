
'use client';

import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FilePlus, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type CourseManagementClientProps = {
  courses: Course[];
};

export function CourseManagementClient({ courses }: CourseManagementClientProps) {
  const router = useRouter();

  const handleAddNewCourse = () => {
    // En el futuro, esto podría redirigir a /admin/courses/new
    alert('Funcionalidad para agregar nuevo curso próximamente.');
  };

  const handleEditCourse = (courseId: string) => {
    // En el futuro, esto podría redirigir a /admin/courses/edit/[id]
    alert(`Funcionalidad para editar el curso ${courseId} próximamente.`);
  };

  const handleDeleteCourse = (courseId: string) => {
    // Esto debería abrir un modal de confirmación
    alert(`Funcionalidad para eliminar el curso ${courseId} próximamente.`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-headline text-primary">Gestión de Cursos</CardTitle>
            <CardDescription>Agrega, edita o elimina los cursos de la plataforma.</CardDescription>
          </div>
          <Button onClick={handleAddNewCourse} className="bg-primary hover:bg-primary/90">
            <FilePlus className="mr-2" />
            Agregar Nuevo Curso
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título del Curso</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{course.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{course.instructor}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditCourse(course.id)} aria-label="Editar curso">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteCourse(course.id)} aria-label="Eliminar curso">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {courses.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No hay cursos para mostrar. ¡Agrega el primero!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
