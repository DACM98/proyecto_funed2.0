
'use client';

import { useState } from 'react';
import type { Course } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FilePlus, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type CourseManagementClientProps = {
  courses: Course[];
};

export function CourseManagementClient({ courses: initialCourses }: CourseManagementClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);

  const handleAddNewCourse = () => {
    // En el futuro, esto podría redirigir a /admin/courses/new
    alert('Funcionalidad para agregar nuevo curso próximamente.');
  };
  
  const handleEditCourse = (updatedCourse: Course) => {
    if (!updatedCourse.id) return;
    
    setCourses(courses.map(course =>
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    
    toast({
        title: 'Curso Actualizado',
        description: `El curso "${updatedCourse.title}" ha sido actualizado correctamente.`,
    });
    setCourseToEdit(null); // Cierra el diálogo
  };

  const handleDeleteCourse = (courseId: string) => {
    const courseToDelete = courses.find(c => c.id === courseId);
    setCourses(courses.filter((course) => course.id !== courseId));
    toast({
        variant: 'destructive',
        title: 'Curso Eliminado',
        description: `El curso "${courseToDelete?.title}" ha sido eliminado.`,
    });
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
                       <Dialog onOpenChange={(isOpen) => !isOpen && setCourseToEdit(null)}>
                        <DialogTrigger asChild>
                           <Button variant="outline" size="icon" onClick={() => setCourseToEdit(course)} aria-label="Editar curso">
                             <Pencil className="h-4 w-4" />
                           </Button>
                        </DialogTrigger>
                        {courseToEdit && courseToEdit.id === course.id && (
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Editar Curso</DialogTitle>
                              <DialogDescription>
                                Realiza cambios en la información del curso aquí. Haz clic en guardar cuando termines.
                              </DialogDescription>
                            </DialogHeader>
                            <form id="edit-course-form" onSubmit={(e) => {
                                e.preventDefault();
                                handleEditCourse(courseToEdit);
                            }}>
                                <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                    Título
                                    </Label>
                                    <Input id="title" value={courseToEdit.title} onChange={(e) => setCourseToEdit({...courseToEdit, title: e.target.value})} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                    Categoría
                                    </Label>
                                    <Input id="category" value={courseToEdit.category} onChange={(e) => setCourseToEdit({...courseToEdit, category: e.target.value})} className="col-span-3" />
                                </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="instructor" className="text-right">
                                    Instructor
                                    </Label>
                                    <Input id="instructor" value={courseToEdit.instructor} onChange={(e) => setCourseToEdit({...courseToEdit, instructor: e.target.value})} className="col-span-3" />
                                </div>
                                </div>
                             </form>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancelar</Button>
                                </DialogClose>
                               <Button type="submit" form="edit-course-form">Guardar Cambios</Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon" aria-label="Eliminar curso">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Esto eliminará permanentemente el curso
                              de nuestros servidores.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteCourse(course.id)}>
                              Continuar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
