import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(3,"Name is required").max(20),
    email: z.email("Invalid email format"),
    password: z.string().min(3,"Minimum 8 length").max(20,"Maximum is 20 length")
});

export const signinSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(3,"Minimum 8 length").max(20,"Maximum is 20 length")
})