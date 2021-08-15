/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next'
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import { formatPrice } from '../utils/formatPrice'

import Styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news | Home</title>
      </Head>

      <main className={Styles.contentConatiner}>
        <section className={Styles.hero}>
          <span> 👏 Hey, welcome</span>
          <h1>News about
            the <span>React</span> world</h1>
          <p>Get acess to all the publications <br />
            <span>for {formatPrice(product.amount)} month</span> </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src="/images/avatar.svg" alt="Avatar" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(process.env.STRIPE_API_PRICE, {
    expand:['product']
  }) 
  
  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}