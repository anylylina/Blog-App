import { useState } from 'react'

import { Input } from '@/ui/input'
import { Textarea } from '@/ui/textarea/textarea'
import { Button } from '@/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPostSchema, type PostFormData } from '@/schemas/createPostSchema'

import { useAppDispatch } from '@/store'
import { createPost } from '@/store/slices/postSlice.ts'

import styles from './create-post.module.scss'

type Props = {
  onClose: () => void
}

export const CreatePost = ({ onClose }: Props) => {
  const dispatch = useAppDispatch()

  const [isLoaded, setIsLoaded] = useState(false)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({ resolver: zodResolver(createPostSchema) })

  const handleCreatePost = async (data: PostFormData) => {
    setIsLoaded(true)
    await dispatch(createPost(data))
    setIsLoaded(false)
  }

  const submitHandler = async (data: PostFormData) => {
    await handleCreatePost(data)
    reset()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
      <div className={styles.field}>
        <Input {...register('title')} placeholder="Post title" error={errors.title?.message} />
      </div>

      <div className={styles.field}>
        <Input {...register('author')} placeholder="Author name" error={errors.author?.message} />
      </div>

      <div className={styles.field}>
        <Textarea
          {...register('description')}
          placeholder="Post description"
          error={errors.description?.message}
          rows={3}
        />
      </div>

      <div className={styles.field}>
        <Textarea
          {...register('text')}
          placeholder="Post content"
          error={errors.text?.message}
          rows={6}
        />
      </div>

      <div className={styles.field}>
        <Input {...register('imageUrl')} placeholder="Image URL" error={errors.imageUrl?.message} />
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isLoaded}>
          {isLoaded ? 'Creating...' : 'Create Post'}
        </Button>
      </div>
    </form>
  )
}
