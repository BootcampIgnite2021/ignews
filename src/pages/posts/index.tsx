import Link from 'next/link';
import Styles from './styles.module.scss';

import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic';

import { formatDate } from '../../utils/formatDate'

interface ItemsPosts {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}

interface Posts {
  posts: ItemsPosts[]
}

export default function Posts({ posts }: Posts) {
  return (
    <>
      <Head>ig.news | Posts</Head>

      <main className={Styles.containerPost}>
        <div className={Styles.contentPosts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
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

  // console.log(JSON.stringify(response, null, 2));

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: formatDate(post.last_publication_date)
    }
  })

  return {
    props: {
      posts
    }
  }
}