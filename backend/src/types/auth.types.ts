import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(3,"Name is required").max(20),
    password: z.string().min(3,"Minimum 8 length").max(20,"Maximum is 20 length")
});
