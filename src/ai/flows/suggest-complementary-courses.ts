// This is a server-side file.
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting complementary courses
 * based on a given course name.
 *
 * @exports `suggestComplementaryCourses` -  calls the suggestComplementaryCoursesFlow flow.
 * @exports `SuggestComplementaryCoursesInput` - type of the input to the `suggestComplementaryCourses` function.
 * @exports `SuggestComplementaryCoursesOutput` - type of the output of the `suggestComplementaryCourses` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestComplementaryCoursesInputSchema = z.object({
  courseName: z.string().describe('El nombre del curso para el cual encontrar sugerencias.'),
});
export type SuggestComplementaryCoursesInput = z.infer<typeof SuggestComplementaryCoursesInputSchema>;

const SuggestComplementaryCoursesOutputSchema = z.object({
  suggestedCourses: z
    .array(z.string())
    .describe('Un arreglo de nombres de cursos complementarios sugeridos.'),
});
export type SuggestComplementaryCoursesOutput = z.infer<typeof SuggestComplementaryCoursesOutputSchema>;

export async function suggestComplementaryCourses(input: SuggestComplementaryCoursesInput): Promise<SuggestComplementaryCoursesOutput> {
  return suggestComplementaryCoursesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestComplementaryCoursesPrompt',
  input: {schema: SuggestComplementaryCoursesInputSchema},
  output: {schema: SuggestComplementaryCoursesOutputSchema},
  prompt: `Eres un asistente útil que sugiere cursos complementarios basados en el nombre del curso proporcionado.

  Sugiere una lista de cursos que complementarían el curso llamado: {{{courseName}}}. Devuelve la lista de nombres de los cursos.`,
});

const suggestComplementaryCoursesFlow = ai.defineFlow(
  {
    name: 'suggestComplementaryCoursesFlow',
    inputSchema: SuggestComplementaryCoursesInputSchema,
    outputSchema: SuggestComplementaryCoursesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
