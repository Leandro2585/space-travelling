import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useState } from 'react'
import { FiUser, FiCalendar } from 'react-icons/fi'
import Header from '../components/Header'
import { formattedPosts } from '../services/formattedPosts'
import { getPrismicClient } from '../services/prismic'
import styles from './home.module.scss'

export type Post = {
  uid?: string
  first_publication_date: string | null
  data: {
    title: string
    subtitle: string
    author: string
  }
}

type PostPagination = {
  next_page: string
  results: Post[]
}

type HomeProps = {
  postsPagination?: PostPagination
}

export default function Home({ postsPagination }: HomeProps) {
  const { next_page, results } = postsPagination
  const [pages, setPages] = useState([next_page])
  const [posts, setPosts] = useState(results)
  const loadMorePosts = async () => {
    fetch(pages.slice(-1)[0])
      .then(response => response.json())
      .then(async response => {
        setPages([...pages, response.next_page])
        const newPosts = formattedPosts(response.results)
        setPosts([...posts, ...newPosts])
      })
  }
  return (
    <>
      <Head>
        <title>Space Travelling</title>
      </Head>
      <main className={styles.home_container}>
        <Header />
        <section>
          {posts.map(post => (
            <Link href={`/post/${post.uid}`} key={post.uid}>
              <div className={styles.post_preview}>
                <h1>{post.data.title}</h1>
                <p>{post.data.subtitle}</p>
                <div className={styles.info}>
                  <span>
                    <FiCalendar />
                    <p>
                      {format(
                        new Date(post.first_publication_date),
                        'dd MMM yyyy',
                        {
                          locale: ptBR,
                        }
                      )}
                    </p>
                  </span>
                  <span>
                    <FiUser />
                    <p>{post.data.author}</p>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
        {pages.slice(-1)[0] && (
          <footer className={styles.footer}>
            <button type="button" onClick={() => loadMorePosts()}>
              Carregar mais posts
            </button>
          </footer>
        )}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()
  const response = await prismic.getByType('posts', {
    pageSize: 1,
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
  })
  const posts = formattedPosts(response.results)
  return {
    props: {
      postsPagination: {
        next_page: response.next_page,
        results: posts,
      },
    },
  }
}
