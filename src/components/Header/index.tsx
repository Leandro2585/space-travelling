import Link from 'next/link'
import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.home_header}>
      <Link href="/">
        <img src="/svgs/logo.svg" alt="logo" />
      </Link>
    </header>
  )
}
