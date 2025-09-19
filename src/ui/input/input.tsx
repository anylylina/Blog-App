import React from 'react'
import { cn } from '@/lib/utils.ts'

import styles from './input.module.scss'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export const Input = ({ className, label, error, ...props }: Props) => {
  return (
    <div className={styles.root}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={cn(styles.input, error && styles.error, className)} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}
