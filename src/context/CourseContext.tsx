'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { EnrolledCourse } from '@/lib/types';
import { useAuth } from './AuthContext';

// Simulación: leemos los datos iniciales del JSON.
// En una app real, esto podría ser un array vacío y los datos se cargarían desde una API.
import initialEnrolledCourses from '@/data/enrolled-courses.json';

interface CourseContextType {
  enrolledCourses: EnrolledCourse[];
  loading: boolean;
  enrollCourse: (course: EnrolledCourse) => Promise<void>;
  isEnrolled: (courseId: string) => boolean;
  isEnrolling: boolean;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(initialEnrolledCourses);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);

  useEffect(() => {
    // En una aplicación real, aquí harías una llamada a tu API para obtener
    // los cursos del usuario logueado (usando user.uid, por ejemplo).
    // Como estamos simulando, simplemente terminamos la carga.
    if (user) {
      setLoading(false);
    } else {
      // Si no hay usuario, vaciamos la lista y terminamos la carga.
      setEnrolledCourses([]);
      setLoading(false);
    }
  }, [user]);

  const enrollCourse = useCallback(async (course: EnrolledCourse) => {
    setIsEnrolling(true);
    // Simulamos una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 500));
    setEnrolledCourses(prevCourses => {
      // Evitamos añadir duplicados
      if (prevCourses.some(c => c.id === course.id)) {
        return prevCourses;
      }
      return [...prevCourses, course];
    });
    setIsEnrolling(false);
  }, []);

  const isEnrolled = useCallback((courseId: string) => {
    return enrolledCourses.some(course => course.id === courseId);
  }, [enrolledCourses]);


  return (
    <CourseContext.Provider value={{ enrolledCourses, loading, enrollCourse, isEnrolled, isEnrolling }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
