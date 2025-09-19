import React from 'react'
import type { Post } from '@/types/post'
import { formatDate } from '@/utils/date'
import { PostImage } from '@/components/post-image'

import styles from './post-card.module.scss'

type Props = {
  post: Post
  onEdit: (post: Post) => void
  onView: (post: Post) => void
}

export const PostCard = ({ post, onEdit, onView }: Props) => {
  const handleView = () => onView(post)
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onEdit(post)
  }

  return (
    <div className={styles.root} onClick={handleView}>
      <PostImage src={post.imageUrl} alt={post.title} />
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.text}>{post.description}</p>
      <div>
        <span className={styles.comments}>Comments: {post.commentsCount}</span>
        <div className={styles.row}>
          <div className={styles.info}>
            <span className={styles.author}>{post.author}</span>
            <span className={styles.date}>{formatDate(post.updatedAt)}</span>
          </div>
          <button className={styles.button} onClick={handleEdit}>
            Edit
            <span className={styles.icon}> ✏️</span>
          </button>
        </div>
      </div>
    </div>
  )
}
