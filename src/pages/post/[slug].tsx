/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/alt-text */
// import { GetStaticPaths, GetStaticProps } from 'next'
import { format, formatDistance, formatRelative } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi'
import Header from '../../components/Header'
import { getPrismicClient } from '../../services/prismic'

import styles from './post.module.scss'

interface Post {
  first_publication_date: string | null
  distance_publication_date: string | null
  data: {
    title: string
    banner: {
      url: string
    }
    author: string
    content: {
      heading: string
      body: {
        text: string
      }[]
    }[]
  }
}

type PostProps = {
  post: Post
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>Space Travelling</title>
      </Head>
      <main className={styles.post_container}>
        <Header />
        <img src="/images/banner.png" className={styles.hero} />
        <article className={styles.content}>
          <h1>{post.data.title}</h1>
          <div className={styles.info}>
            <span>
              <FiCalendar />
              <time>{post.first_publication_date}</time>
            </span>
            <span>
              <FiUser />
              <p>{post.data.author}</p>
            </span>
            <span>
              <FiClock />
              <p>{post.distance_publication_date}</p>
            </span>
          </div>
          <section>
            {/* <div dangerouslySetInnerHTML={{ __html: post.data.content }} /> */}
            {post.data.content[0].body.map(({ text }) => {
              return <div dangerouslySetInnerHTML={{ __html: text }} />
            })}
            {/* {post.data.content.map(section => (
              <>
                <h2>{section.heading}</h2>

              </>
            ))} */}
          </section>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: ['/post/criando-um-app-cra-do-zero'] }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  const prismic = getPrismicClient()
  const response = await prismic.getByUID('posts', slug.toString(), {})
  const diffDate = formatRelative(
    new Date(response.first_publication_date),
    new Date(),
    {
      locale: ptBR,
    }
  )

  const post: Post = {
    distance_publication_date: diffDate,
    first_publication_date: format(
      new Date(response.first_publication_date),
      'dd, MMM yyyy',
      { locale: ptBR }
    ),
    data: {
      author: response.data.author[0].text,
      banner: response.data.banner.url,
      content: response.data.content,
      title: response.data.title[0].text,
    },
  }
  return {
    props: {
      post,
    },
  }
  //   // TODO
}
