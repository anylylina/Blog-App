import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'

export function TestFirebase() {
  const handleClick = async () => {
    try {
      const docRef = await addDoc(collection(db, 'test'), {
        text: 'Hello Firebase',
        createdAt: new Date(),
      })
      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return <button onClick={handleClick}>Добавить тестовый документ</button>
}
