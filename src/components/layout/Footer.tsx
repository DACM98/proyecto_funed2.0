import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">FUNED</span>
          </div>
          <div className="flex gap-6 text-muted-foreground mb-4 md:mb-0">
            <Link href="#courses" className="hover:text-primary transition-colors">Cursos</Link>
            <Link href="#" className="hover:text-primary transition-colors">Sobre Nosotros</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contacto</Link>
          </div>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} FUNED. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
