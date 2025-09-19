import {
  addDoc,
  collection,
  orderBy,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { Post } from '@/types/post'
import type { PostFormData } from '@/schemas/createPostSchema'
import { timestampToDate, dateToTimestamp } from './utils'

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    const docs = snapshot.docs

    return docs.map((doc) => docToPost(doc))
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createPost = async (newPost: PostFormData) => {
  try {
    const now = new Date()
    const post = {
      ...newPost,
      updatedAt: dateToTimestamp(now),
      createdAt: dateToTimestamp(now),
      commentsCount: 0,
    }

    const docRef = await addDoc(collection(db, 'posts'), post)
    const createdPost = await fetchPostById(docRef.id)

    if (!createdPost) {
      throw new Error("Can't find post by id")
    }
    return createdPost
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const fetchPostById = async (postId: string): Promise<Post | null> => {
  try {
    const docRef = doc(db, 'posts', postId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docToPost(docSnap)
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}

export const updatePost = async (postId: Post['id'], postData: PostFormData): Promise<Post> => {
  try {
    const postRef = doc(db, 'posts', postId)
    await updateDoc(postRef, {
      title: postData.title,
      text: postData.text,
      author: postData.author,
      updatedAt: dateToTimestamp(new Date()),
      imageUrl: postData.imageUrl || null,
    })

    const updatedPost = await fetchPostById(postId)
    if (!updatedPost) {
      throw new Error("Can't find post by id")
    }

    return updatedPost
  } catch (error) {
    console.error(error)
    throw error
  }
}

function docToPost(doc: QueryDocumentSnapshot | DocumentSnapshot): Post {
  const data = doc.data()

  if (!data) throw new Error('Document data is not found')

  return {
    id: doc.id,
    title: data.title,
    text: data.text,
    description: data.description,
    author: data.author,
    commentsCount: data.commentsCount,
    createdAt: timestampToDate(data.createdAt),
    updatedAt: timestampToDate(data.updatedAt),
    imageUrl: data.imageUrl,
  }
}
