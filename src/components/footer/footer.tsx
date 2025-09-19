import styles from './footer.module.scss'

type FooterLink = {
  label: string
  href: string
}

export const Footer = () => {
  const links: FooterLink[] = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          {links.map((link) => (
            <a key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
