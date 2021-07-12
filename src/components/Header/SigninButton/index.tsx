import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/client'

import Styles from './styles.module.scss'

export function SigninButton() {
  const [session] = useSession()

  return session ? (
    <button 
      className={Styles.signinButton} 
      type="button"
      onClick={() => signOut()}
      >
      <FaGithub size={20} color="#04D361" />
      {session.user?.name}
      <FiX className={Styles.closeIcon} size={20} color="#737380" />
    </button>
  ) : (
    <button 
      className={Styles.signinButton} 
      type="button"
      onClick={() => signIn('github')}
    >
      <FaGithub size={20} color="#EBA417" />
      Sing in with gitHub
    </button>
  )
}

