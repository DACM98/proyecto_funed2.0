export interface Persona {
  idPersona: number;
  nombre: string;
  apellido: string;
  numeroIdentificacion: string;
  tipoIdentificacion: 'CC' | 'TI' | 'CE';
  fechaNacimiento: string;
  telefono: string;
  correo: string;
  rol: 'estudiante' | 'docente' | 'admin';
}

export interface Docente extends Persona {
  idDocente: number;
  especialidad: string;
  fechaContratacion: string;
  fechaTerminacion?: string;
}

export interface Usuario {
  idUsuario: number;
  idPersona: number;
  nombreUsuario: string;
  fechaCreacion: string;
}

export interface Curso {
  id: string; // idCurso in DB
  title: string; // nombreCurso in DB
  description: string; // temario in DB
  instructor: string; // This will be manually joined from Docente/Persona
  category: string; // tipoCurso in DB
  duration: number; // duracion in DB (in hours)
  image: string;
  'data-ai-hint': string;
}

export interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  progress: number; // percentage
  status: 'en-progreso' | 'completado';
}

export interface Grade {
  id: string;
  courseName: string;
  score: number; // out of 100
  feedback: string;
  date: string;
}
