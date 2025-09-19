import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { type PostFormData, createPostSchema } from '@/schemas/createPostSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea'
import { Button } from '@/ui/button'

import type { Post } from '@/types/post'

import styles from './post-form.module.scss'

type Props = {
  post?: Post
  onSave: (data: PostFormData) => Promise<void>
  onClose: () => void
}

export const PostForm = ({ post, onSave, onClose }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(createPostSchema),
    ...(post && {
      defaultValues: {
        title: post.title,
        author: post.author,
        imageUrl: post.imageUrl || '',
        description: post.description,
        text: post.text,
      },
    }),
  })

  const submitHandler = async (data: PostFormData) => {
    try {
      setIsLoaded(true)
      await onSave(data)
      reset()
      onClose()
    } finally {
      setIsLoaded(false)
    }
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{post ? 'Edit post' : 'Create a new post'}</h3>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={styles.grid}>
          <Input
            label="Title *"
            placeholder="Enter the post title"
            error={errors.title?.message}
            {...register('title')}
          />
          <Input
            label="Author *"
            placeholder="Enter the author's name"
            error={errors.author?.message}
            disabled={isLoaded || !!post}
            {...register('author')}
          />
        </div>

        <Input
          label="Image"
          placeholder="Enter image URL"
          error={errors.imageUrl?.message}
          disabled={isLoaded}
          {...register('imageUrl')}
        />

        <Textarea
          label="Descrption*"
          placeholder="Description of the post"
          error={errors.description?.message}
          maxLength={500}
          showCharCounter={true}
          disabled={isLoaded}
          rows={4}
          {...register('description')}
        />

        <Textarea
          label="Text*"
          placeholder="Main text of the post"
          error={errors.text?.message}
          maxLength={2000}
          showCharCounter={true}
          disabled={isLoaded}
          rows={8}
          {...register('text')}
        />

        <div className={styles.actions}>
          <Button variant="secondary" className={styles.cancel} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className={styles.save} loading={isLoaded}>
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
