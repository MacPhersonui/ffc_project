import styles from '../styles/layout.module.scss'
import Link from 'next/link'

const Footer = ({ t }) => {
    return (
      <footer className={styles.footer}>
        <ul>
          <li onClick={() => window.open('https://twitter.com/leagueofffc')}>
            <i className={styles.twitter}></i>
          </li>
          <li onClick={() => window.open('https://discord.gg/7YcbauR7xD')}>
            <i className={styles.discord}></i>
          </li>
        </ul>
      </footer>
    )
}

export default Footer