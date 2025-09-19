import { PostCard } from '../post-card'

import { PostCardSkeleton } from '@/components/post-card-skeleton'

import { usePosts } from './usePosts'

import type { Post } from '@/types/post.ts'

import styles from './posts.module.scss'

type Props = {
  onEdit: (postId: Post) => void
  onView: (postId: Post) => void
}

export const Posts = ({ onEdit, onView }: Props) => {
  const { isLoading, posts } = usePosts()

  if (!isLoading && posts.length === 0) {
    return <div className={styles.empty}>There are not yet any blogs</div>
  }

  return (
    <div className={styles.root}>
      {isLoading && Array.from({ length: 6 }).map((_, index) => <PostCardSkeleton key={index} />)}
      {!isLoading &&
        posts.map((post) => <PostCard key={post.id} post={post} onEdit={onEdit} onView={onView} />)}
    </div>
  )
}
