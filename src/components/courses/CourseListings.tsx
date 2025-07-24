'use client';

import { useState, useMemo } from 'react';
import type { Course } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { CourseCard } from './CourseCard';
import { Search } from 'lucide-react';

type CourseListingsProps = {
  courses: Course[];
};

export function CourseListings({ courses }: CourseListingsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = useMemo(() => {
    if (!searchTerm) return courses;
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  return (
    <div>
      <div className="relative mb-8 max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por palabra clave, categoría o instructor..."
          className="pl-10 h-12 text-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar cursos"
        />
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No se encontraron cursos</h2>
          <p className="text-muted-foreground">Intenta ajustar tu término de búsqueda.</p>
        </div>
      )}
    </div>
  );
}
