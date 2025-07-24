'use client';

import Link from 'next/link';
import { Compass, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <Compass className="h-8 w-8" />
            <span className="text-2xl font-bold font-headline">Course Compass</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </Link>
            </Button>
            <Button variant="ghost" asChild>
               <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
               <Link href="/signup">Sign Up</Link>
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
