'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSuggestedCourses } from '@/actions/courses';
import { Wand2, Loader2, AlertTriangle, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type SuggestedCoursesProps = {
  courseName: string;
};

export function SuggestedCourses({ courseName }: SuggestedCoursesProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleGetSuggestions = () => {
    startTransition(async () => {
      const result = await getSuggestedCourses(courseName);
      if (result.success && result.courses) {
        setSuggestions(result.courses);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Failed to get suggestions.',
        });
      }
    });
  };

  return (
    <Card className="bg-card/50 mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Wand2 className="text-primary" />
          <span>AI Course Companion</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {suggestions.length === 0 ? (
          <>
            <p className="text-muted-foreground mb-4">Discover courses that complement "{courseName}".</p>
            <Button onClick={handleGetSuggestions} disabled={isPending} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Suggest Complementary Courses
                </>
              )}
            </Button>
          </>
        ) : (
          <div>
            <h3 className="font-semibold mb-3 text-lg">We also recommend:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start p-3 bg-background rounded-md shadow-sm">
                   <Lightbulb className="w-5 h-5 mr-3 mt-1 text-primary shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
