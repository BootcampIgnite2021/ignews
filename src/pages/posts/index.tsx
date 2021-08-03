import Styles from './posts.module.scss';

import Head from 'next/head'

export default function Posts() {
  return (
    <>
      <Head>ig.news | Posts</Head>

      <main className={Styles.container}>
        <div className={Styles.posts}>
          <a href="">
            <time>12 de março 2021</time>
            <strong>safhjsdfklhsdfkjlshdfljksdhfkjsdhfklsjdfhksdl</strong>
            <p>fsdfjsdfjsdflkjsdflksdfjlsdk</p>
          </a>

          <a href="">
            <time>12 de março 2021</time>
            <strong>safhjsdfklhsdfkjlshdfljksdhfkjsdhfklsjdfhksdl</strong>
            <p>fsdfjsdfjsdflkjsdflksdfjlsdk</p>
          </a>

          <a href="">
            <time>12 de março 2021</time>
            <strong>safhjsdfklhsdfkjlshdfljksdhfkjsdhfklsjdfhksdl</strong>
            <p>fsdfjsdfjsdflkjsdflksdfjlsdk</p>
          </a>
        </div>
      </main>
    </>
  )
}