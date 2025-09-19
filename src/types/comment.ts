export type Comment = {
  id: string
  postId: string
  author: string
  text: string
  createdAt: string
  updatedAt: string
}

export type CommentFormData = {
  author: string
  text: string
}
