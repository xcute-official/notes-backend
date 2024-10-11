import * as z from 'zod';
export const NoteSchema = z.object({
    title: z.string().min(5).max(200),
    description: z.string().min(20).max(500),
    content: z.any()
})
export const NoteUpdateSchema = z.object({
    title: z.string().min(5).max(200),
    description: z.string().min(20).max(500),
    content: z.any(),
    id: z.string().min(3)
})
export const SignupSchema = z.object({
    username: z.string().min(3).max(15),
    email: z.string().email(),
    password: z.string().min(6).max(15)
});
export const LoginSchema = z.object({
    username: z.string().min(3).max(15),
    password: z.string().email()
})