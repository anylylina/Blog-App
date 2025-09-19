import React from 'react'
import { cn } from '@/lib/utils'

import styles from './button.module.scss'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  loading?: boolean
  className?: string
}

export const Button = ({
  variant = 'primary',
  children,
  className,
  loading = false,
  ...props
}: Props) => {
  return (
    <button className={cn(styles.button, styles[variant], className)} disabled={loading} {...props}>
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  )
}
