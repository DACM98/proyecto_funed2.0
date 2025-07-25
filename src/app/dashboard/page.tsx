// Este es un Server Component. Obtiene los datos y los pasa al componente de cliente.
import { promises as fs } from 'fs';
import path from 'path';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import type { EnrolledCourse, Grade } from '@/lib/types';

// Simulación de obtención de datos. En una app real, esto vendría de tu base de datos.
async function getEnrolledCourses(): Promise<EnrolledCourse[]> {
  // Por ahora, usamos un archivo JSON como placeholder.
  const filePath = path.join(process.cwd(), 'src', 'data', 'enrolled-courses.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Failed to read or parse enrolled-courses.json:", error);
    return [];
  }
}

async function getGrades(): Promise<Grade[]> {
  // Por ahora, usamos un archivo JSON como placeholder.
  const filePath = path.join(process.cwd(), 'src', 'data', 'grades.json');
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Failed to read or parse grades.json:", error);
    return [];
  }
}


export default async function DashboardPage() {
  // Obtenemos los datos en el servidor
  const enrolledCourses = await getEnrolledCourses();
  const grades = await getGrades();

  // Pasamos los datos al componente de cliente para que los renderice.
  return <DashboardClient enrolledCourses={enrolledCourses} grades={grades} />;
}
