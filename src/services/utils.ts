import { Timestamp } from 'firebase/firestore'

export const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date)
}

export const timestampToDate = (ts: Timestamp): string => {
  const date = new Date(ts.seconds * 1000 + ts.nanoseconds / 1e6)

  return date.toISOString()
}
