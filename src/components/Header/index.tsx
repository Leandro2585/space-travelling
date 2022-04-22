import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.home_header}>
      <img src="/svgs/logo.svg" alt="Space Travelling" />
    </header>
  )
}
