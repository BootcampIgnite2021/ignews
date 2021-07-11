import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'

import Styles from './home.module.scss'

export default function Home() {
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
            <span>for $9,90 month</span> </p>
          <SubscribeButton />
        </section>
        <img src="/images/avatar.svg" alt="Avatar" />
      </main>
    </>
  )
}
