import { z } from 'zod';

export const formSchema = z.object({
  username: z.string().min(1, { message: 'user name is required' }),
  email: z.string().min(1, { message: 'email is required' }).max(100).email(),
  password: z.string().min(1, { message: 'password is required' }),
});

export type FormValues = z.infer<typeof formSchema>;
