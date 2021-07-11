import Head from 'next/head'
import Styles from '../styles/home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>ig.news | Início</title>
      </Head>
      <h1 className={Styles.title}>
        Hello world
      </h1>
    </>
  )
}
