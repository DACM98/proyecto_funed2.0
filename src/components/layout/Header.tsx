'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <Sparkles className="h-8 w-8" />
            <span className="text-2xl font-bold font-headline">Funed</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
             <Button variant="ghost" asChild>
              <Link href="#courses">
                Cursos
              </Link>
            </Button>
            <Button variant="ghost" asChild>
               <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
               <Link href="/signup">Regístrate</Link>
            </Button>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu could be implemented here */}
          </div>
        </div>
      </div>
    </header>
  );
}
