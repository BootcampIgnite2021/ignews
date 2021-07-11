import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import Styles from './styles.module.scss'

export function SigninButton() {
  const isUserLoggedIn = true

  return isUserLoggedIn ? (
    <button className={Styles.signinButton} type="button">
      <FaGithub size={20} color="#04D361" />
      Francisco Júnior
      <FiX className={Styles.closeIcon} size={20} color="#737380" />
    </button>
  ) : (
    <button className={Styles.signinButton} type="button">
      <FaGithub size={20} color="#EBA417" />
      Sing in with gitHub
    </button>
  )
}

