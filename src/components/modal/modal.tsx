import React from 'react'
import ReactModal from 'react-modal'

import { useBodyLock } from '@/hooks/useBodyLock.tsx'

import styles from './modal.module.scss'

type Props = {
  isOpen: boolean
  width?: string | number
  height?: string | number
  onClose: () => void
  children: React.ReactNode
}

ReactModal.setAppElement('#root')

export const Modal = ({ isOpen, width, height, onClose, children }: Props) => {
  useBodyLock(isOpen)

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      shouldCloseOnOverlayClick={true}
      style={{
        content: {
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          maxWidth: '95%',
          maxHeight: '95%',
          overflowY: 'auto',
        },
      }}
    >
      <div className={styles.close} onClick={onClose}>
        x
      </div>
      {children}
    </ReactModal>
  )
}
