'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut, LayoutDashboard, Cog } from 'lucide-react';

export function Header() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Sesión Cerrada',
        description: 'Has cerrado sesión exitosamente.',
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo cerrar la sesión.',
      });
    }
  };

  return (
    <header className="bg-card/80 backdrop-blur-lg border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <Image
              src="/logo.svg"
              alt="FUNED Logo"
              width={180}
              height={45}
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-2">
             <Button variant="ghost" asChild>
              <Link href="/#courses">
                Cursos
              </Link>
            </Button>
            {user ? (
               <>
                <Button variant="ghost" asChild>
                   <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Mi Panel
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                   <Link href="/admin/courses">
                    <Cog className="mr-2 h-4 w-4" />
                    Administrar
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-sm text-foreground border-l pl-4 ml-2">
                  <span>{user.displayName || user.email}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Cerrar sesión">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                   <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button asChild>
                   <Link href="/signup">Regístrate</Link>
                </Button>
              </>
            )}
          </nav>
          <div className="md:hidden">
            {/* Mobile menu could be implemented here */}
          </div>
        </div>
      </div>
    </header>
  );
}
