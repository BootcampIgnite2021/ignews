import {  GetStaticProps } from "next"
import { useSession } from "next-auth/client"
import Head from "next/head"
import Link from "next/link"
import router from "next/router"
import { RichText } from "prismic-dom"
import { useEffect } from "react"
import { getPrismicClient } from "../../../services/prismic"

import { formatDate } from '../../../utils/formatDate'

import Styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return(
    <>
      <Head>
        <title>ig.news | {post.title}</title>
      </Head>

      <main className={Styles.container}>
        <article className={Styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
            className={`${Styles.postContent} ${Styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
          <div className={Styles.continuereading}>
            Wanna continue reading ? 
            <Link href="/">
              Subscribe now 🤗
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: formatDate(response.last_publication_date)
  }

  return {
    props: {
      post
    }
  }
}