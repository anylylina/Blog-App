import React from 'react'

import styles from './heder.module.scss'

type Props = {
  children?: React.ReactNode
}

export const Header = ({ children }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>✏️ BlogApp</div>
        {children}
      </div>
    </header>
  )
}
