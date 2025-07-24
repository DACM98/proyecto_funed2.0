import Link from 'next/link';
import { Compass } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Compass className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Course Compass</span>
          </div>
          <div className="flex gap-6 text-muted-foreground mb-4 md:mb-0">
            <Link href="/" className="hover:text-primary transition-colors">Courses</Link>
            <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Course Compass. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
