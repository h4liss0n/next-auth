import { z } from 'zod';

export const formSchema = z.object({
  title: z.string().min(1, { message: 'project name is required!' }),
});

export type FormValues = z.infer<typeof formSchema>;
