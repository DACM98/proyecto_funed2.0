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
  courseName: z.string().describe('The name of the course to find suggestions for.'),
});
export type SuggestComplementaryCoursesInput = z.infer<typeof SuggestComplementaryCoursesInputSchema>;

const SuggestComplementaryCoursesOutputSchema = z.object({
  suggestedCourses: z
    .array(z.string())
    .describe('An array of names of suggested complementary courses.'),
});
export type SuggestComplementaryCoursesOutput = z.infer<typeof SuggestComplementaryCoursesOutputSchema>;

export async function suggestComplementaryCourses(input: SuggestComplementaryCoursesInput): Promise<SuggestComplementaryCoursesOutput> {
  return suggestComplementaryCoursesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestComplementaryCoursesPrompt',
  input: {schema: SuggestComplementaryCoursesInputSchema},
  output: {schema: SuggestComplementaryCoursesOutputSchema},
  prompt: `You are a helpful assistant that suggests complementary courses based on the given course name.

  Suggest a list of courses that would complement the course named: {{{courseName}}}. Return the list of course names.`,
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
