import { ActiveLink } from './ActiveLink'
import { SigninButton } from './SigninButton'
import Styles from './styles.module.scss'

export function Header() {

  return (
    <header className={Styles.headerContainer}>
      <div className={Styles.headerContent}>
        <div className={Styles.headerContainerLogoDesktop}>
          <ActiveLink href="/" activeClassName={Styles.active}>
            <img src="/images/logo.svg" alt="Logo" />
          </ActiveLink>
        </div>
        <div className={Styles.headerContainerLogoMobile}>
          <ActiveLink href="/" activeClassName={Styles.active}>
            <img src="/images/logoMobile.svg" alt="Logo" />
          </ActiveLink>
        </div>
        <nav>
          <ActiveLink href="/" activeClassName={Styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={Styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SigninButton />
      </div>
    </header>
  )
}