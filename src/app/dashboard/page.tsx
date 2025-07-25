// Este es un Server Component. Obtiene los datos y los pasa al componente de cliente.
import { promises as fs } from 'fs';
import path from 'path';
import { DashboardClient } from '@/components/dashboard/DashboardClient';
import type { Grade } from '@/lib/types';

// Simulación de obtención de datos. En una app real, esto vendría de tu base de datos.
// Los cursos inscritos ahora se manejan en el cliente a través de CourseContext.

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
  // Ya no obtenemos los cursos inscritos aquí, se manejarán en el cliente.
  const grades = await getGrades();

  // Pasamos los datos al componente de cliente para que los renderice.
  return <DashboardClient grades={grades} />;
}
