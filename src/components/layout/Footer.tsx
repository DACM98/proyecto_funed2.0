import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <Image
              src="/logo.svg"
              alt="FUNED Logo"
              width={140}
              height={35}
              className="opacity-80"
            />
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
