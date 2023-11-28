import { z } from 'zod';

export const formSchema = z.object({
  title: z.string().min(1, { message: 'task title is required' }),
  done: z.boolean(),
});

export type FormValues = z.infer<typeof formSchema>;
