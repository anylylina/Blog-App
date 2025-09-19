import { Modal } from '@/components/modal/modal'
import { PostForm } from '@/components/post-form'
import type { Post } from '@/types/post.ts'
import type { PostFormData } from '@/schemas/createPostSchema.ts'
import { useAppDispatch } from '@/store'
import { updatePost } from '@/store/slices/postSlice.ts'

type Props = {
  post: Post
  onClose: () => void
}

export const ModalEditPost = ({ post, onClose }: Props) => {
  const dispatch = useAppDispatch()

  const handleSave = async (data: PostFormData) => {
    await dispatch(updatePost({ postId: post.id, postData: data }))
  }

  return (
    <Modal isOpen={true} onClose={onClose} width={1200}>
      <PostForm onSave={handleSave} post={post} onClose={onClose} />
    </Modal>
  )
}
