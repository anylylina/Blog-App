import z from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  imageUrl: z.string().url('Enter a valid URL').or(z.literal('')).optional(),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  text: z.string().min(1, 'Text is required').max(2000, 'Text is too long'),
})

export type PostFormData = z.infer<typeof createPostSchema>
