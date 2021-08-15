import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'

import Styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession()
  
  const { push } = useRouter()

  async function handleSubscribe() {
    if(!session) {
      signIn('github')
      return
    }

    if (session.activeSubscription) {
      push('/posts')
      return;
    }

    try {
      const response = await api.post('/subscribe')

      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({sessionId})
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <button className={Styles.subscribeButton} type="button" onClick={handleSubscribe}>Subscribe now</button>
  )
}