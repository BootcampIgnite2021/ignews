import { SigninButton } from './SigninButton'
import Styles from './styles.module.scss'

export function Header() {
  return (
    <header className={Styles.headerContainer}>
      <div className={Styles.headerContent}>
        <div className={Styles.headerContainerLogoDesktop}>
          <img src="/images/logo.svg" alt="Logo" />
        </div>
        <div className={Styles.headerContainerLogoMobile}>
          <img src="/images/logoMobile.svg" alt="Logo" />
        </div>
        <nav>
          <a className={Styles.active}>Home</a>
          <a>Posts</a>
        </nav>
        <SigninButton />
      </div>
    </header>
  )
}