import backupPostImage from '@/assets/images/backupPostImage.webp'

import { cn } from '@/lib/utils'

import styles from './post-image.module.scss'

type Props = {
  src?: string
  alt?: string
  className?: string
}

export const PostImage = ({ src, alt, className }: Props) => {
  return (
    <img
      loading="lazy"
      decoding="async"
      className={cn(styles.image, className)}
      src={src || backupPostImage}
      alt={alt}
    />
  )
}
