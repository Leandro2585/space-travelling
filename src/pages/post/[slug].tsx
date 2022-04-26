/* eslint-disable jsx-a11y/alt-text */
// import { GetStaticPaths, GetStaticProps } from 'next'
import { format, formatDistance, formatRelative } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom'
import { useEffect } from 'react'
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi'
import Header from '../../components/Header'
import { getPrismicClient } from '../../services/prismic'

import styles from './post.module.scss'

interface Post {
  first_publication_date: string | null
  distance_publication_date?: string | null
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
  const router = useRouter()
  if (router.isFallback) {
    return <div>Carregando...</div>
  }
  const diffDate = formatDistance(
    new Date(response.first_publication_date),
    new Date(),
    {
      locale: ptBR,
    }
  )
  // const content = post.data.content.map(({ heading, body }) => {
  //   return {
  //     heading,
  //     body: [
  //       {
  //         text: RichText.asHtml(body),
  //       },
  //     ],
  //   }
  // })
  const currentPost: Post = {
    distance_publication_date: diffDate,
    first_publication_date: format(
      new Date(post.first_publication_date),
      'dd, MMM yyyy',
      { locale: ptBR }
    ),
    data: {
      author: post.data.author,
      banner: {
        url: post.data.banner.url,
      },
      title: post.data.title,
      content: post.data.content,
    },
  }
  return (
    <>
      <Head>
        <title>Space Travelling</title>
      </Head>
      <main className={styles.post_container}>
        <Header />
        <img src="/images/banner.png" className={styles.hero} />
        <article className={styles.content_container}>
          <h1>{currentPost.data.title}</h1>
          <div className={styles.info}>
            <span>
              <FiCalendar />
              <time>{currentPost.first_publication_date}</time>
            </span>
            <span>
              <FiUser />
              <p>{currentPost.data.author}</p>
            </span>
            <span>
              <FiClock />
              <p>{currentPost?.distance_publication_date}</p>
            </span>
          </div>
          <section className={styles.content}>
            {currentPost.data.content.map((currentContent, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <h2
                  dangerouslySetInnerHTML={{ __html: currentContent.heading }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: currentContent.body[0].text,
                  }}
                />
              </div>
            ))}
          </section>
        </article>
      </main>
    </>
  )
}
