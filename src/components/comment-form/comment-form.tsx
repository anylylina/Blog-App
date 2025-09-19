import React, { useState } from 'react'
import { Button } from '@/ui/button'
import { Textarea } from '@/ui/textarea'
import { Input } from '@/ui/input'

import styles from './comment-form.module.scss'

type Props = {
  postId: string
  onSubmit: (author: string, text: string) => void
  loading?: boolean
}

export const CommentForm = ({ onSubmit, loading = false }: Props) => {
  const [author, setAuthor] = useState('')
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const valueAuthor = author.trim()
    const valueText = text.trim()

    if (!valueAuthor || !valueText) return

    onSubmit(valueAuthor, valueText)
    setAuthor('')
    setText('')
  }

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h4 className={styles.title}>Add a Comment</h4>

      <div className={styles.field}>
        <Input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div className={styles.field}>
        <Textarea
          placeholder="Write your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          disabled={loading}
          rows={3}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        loading={loading}
        disabled={!author.trim() || !text.trim()}
        className={styles.submitButton}
      >
        Post Comment
      </Button>
    </form>
  )
}
