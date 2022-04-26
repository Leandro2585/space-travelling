/* eslint-disable jsx-a11y/alt-text */
import { format, formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom'
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi'
import Header from '../../components/Header'
import { getPrismicClient } from '../../services/prismic'

import styles from './post.module.scss'

interface Post {
  uid?: string
  first_publication_date: string | null
  data: {
    subtitle: string
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
  const { isFallback } = useRouter()
  if (isFallback) {
    return <div>Carregando...</div>
  }
  const diffDate = formatDistance(
    new Date(),
    new Date(post.first_publication_date),
    {
      locale: ptBR,
    }
  ).slice(0, 5)

  const content = post.data.content.map(({ heading, body }) => {
    return {
      heading,
      body: body.map(({ text }) => RichText.asHtml(text)),
    }
  })
  // .console.log(content)
  const currentPost: Post = {
    first_publication_date: format(
      new Date(post.first_publication_date),
      'dd MMM yyyy',
      { locale: ptBR }
    ),
    data: {
      subtitle: post.data.subtitle,
      author: post.data.author,
      banner: {
        url: post.data.banner.url,
      },
      title: post.data.title,
      content,
    },
  }
  return (
    <>
      <Head>
        <title>Space Travelling</title>
      </Head>
      <main className={styles.post_container}>
        <Header />
        <img src={currentPost.data.banner.url} className={styles.hero} />
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
              <p>{diffDate}</p>
            </span>
          </div>
          <section className={styles.content}>
            {currentPost.data.content.map((currentContent, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <h2
                  dangerouslySetInnerHTML={{ __html: currentContent.heading }}
                />
                {currentContent.body.map(({ text }) => {
                  return (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: text,
                      }}
                    />
                  )
                })}
              </div>
            ))}
          </section>
        </article>
      </main>
    </>
  )
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  const prismic = getPrismicClient()
  const response = await prismic.getByUID('posts', String(slug), {})
  const post: Post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      author: response.data.author,
      banner: { url: response.data.banner.url },
      content: response.data.content,
      subtitle: response.data.subtitle,
      title: response.data.title,
    },
  }
  return {
    props: {
      post,
    },
  }
}
