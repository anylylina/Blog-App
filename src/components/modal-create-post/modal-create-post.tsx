import { Modal } from '@/components/modal/modal'
import { PostForm } from '@/components/post-form'
import { useAppDispatch } from '@/store'
import { createPost } from '@/store/slices/postSlice.ts'

import type { PostFormData } from '@/schemas/createPostSchema.ts'

type Props = {
  onClose: () => void
}

export const ModalCreatePost = ({ onClose }: Props) => {
  const dispatch = useAppDispatch()

  const handleCreate = async (data: PostFormData) => {
    await dispatch(createPost(data))
  }

  return (
    <Modal isOpen={true} onClose={onClose} width={1200}>
      <PostForm onSave={handleCreate} onClose={onClose} />
    </Modal>
  )
}
