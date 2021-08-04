import Styles from './posts.module.scss';

import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic';

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

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')], {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    }
  )

  console.log(JSON.stringify(response, null, 2));

  return {
    props: {

    }
  }
}