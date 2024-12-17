import { z } from 'zod';

export const analysisQuerySchema = z.object({
  query: z
    .string()
    .min(2, 'Query must be at least 2 characters long')
    .max(200, 'Query must not exceed 200 characters')
    .trim(),
});

export type AnalysisQuery = z.infer<typeof analysisQuerySchema>;