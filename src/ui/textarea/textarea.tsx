import React, { useState, useEffect } from 'react'

import { cn } from '@/lib/utils'

import styles from './textarea.module.scss'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
  maxLength?: number
  showCharCounter?: boolean
}

export const Textarea = ({
  className,
  label,
  error,
  maxLength,
  value,
  onChange,
  showCharCounter = false,
  ...props
}: Props) => {
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (value !== undefined) {
      setCharCount(String(value).length)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setCharCount(newValue.length)
    onChange?.(e)
  }

  const isNearLimit = maxLength && charCount > maxLength * 0.8
  const isOverLimit = maxLength && charCount > maxLength

  return (
    <div className={styles.root}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={cn(
          styles.textarea,
          error && styles.error,
          isOverLimit && styles.overLimit,
          className
        )}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        {...props}
      />
      <div className={styles.bottom}>
        {showCharCounter && (
          <div className={styles.charCounter}>
            <span
              className={cn(
                styles.charCount,
                isNearLimit && styles.nearLimit,
                isOverLimit && styles.overLimit
              )}
            >
              {charCount}
              {maxLength && `/${maxLength}`}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
