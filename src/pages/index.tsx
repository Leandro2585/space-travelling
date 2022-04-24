import { GetServerSideProps, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FiUser, FiCalendar } from 'react-icons/fi'
import Header from '../components/Header'
import { getPrismicClient } from '../services/prismic'
import styles from './home.module.scss'

type Post = {
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
  return (
    <>
      <Head>
        <title>Space Travelling</title>
      </Head>
      <main className={styles.home_container}>
        <Header />
        <section>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Link href="/post/cra-do-zero" key={_}>
              <div className={styles.post_preview}>
                <h1>Criando um app CRA do zero</h1>
                <p>
                  Tudo sobre como criar a sua primeira aplicação utilizando
                  Create React App
                </p>
                <div className={styles.info}>
                  <span>
                    <FiCalendar />
                    <p>19 Abr 2021</p>
                  </span>
                  <span>
                    <FiUser />
                    <p>Joseph Oliveira</p>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
        <footer className={styles.footer}>
          <span>Carregar mais posts</span>
        </footer>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const prismic = getPrismicClient({ req })
  const response = await prismic.getAllByType('posts', {
    pageSize: 5,
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
  })
  const posts = response.map(post => ({
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: {
      title: post.data.title.text,
      subtitle: post.data.subtitle.text,
      author: post.data.author.text,
    },
  }))
  // const postsResponse = await prismic.getByType(TODO);
  // TODO
  return {
    props: {
      posts,
    },
  }
}
