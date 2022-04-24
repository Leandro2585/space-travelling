/* eslint-disable jsx-a11y/alt-text */
// import { GetStaticPaths, GetStaticProps } from 'next'

import { GetStaticProps } from 'next'
import Head from 'next/head'
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi'
import Header from '../../components/Header'
import styles from './post.module.scss'
import { getPrismicClient } from '../../services/prismic'

// import commonStyles from '../../styles/common.module.scss'
// import styles from './post.module.scss'

// interface Post {
//   first_publication_date: string | null
//   data: {
//     title: string
//     banner: {
//       url: string
//     }
//     author: string
//     content: {
//       heading: string
//       body: {
//         text: string
//       }[]
//     }[]
//   }
// }

type PostProps = {
  // post: Post
  slug: string
}

export default function Post() {
  return (
    <>
      <Head>
        <title>Space Travelling</title>
      </Head>
      <main className={styles.post_container}>
        <Header />
        <img src="/images/banner.png" className={styles.hero} />
        <article className={styles.content}>
          <h1>Criando um app CRA do zero</h1>
          <div className={styles.info}>
            <span>
              <FiCalendar />
              <time>19 Abr 2021</time>
            </span>
            <span>
              <FiUser />
              <p>Joseph Oliveira</p>
            </span>
            <span>
              <FiClock />
              <p>4 min</p>
            </span>
          </div>
        </article>
      </main>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient({})
//   // const posts = await prismic.getByType(TODO)
//   return { props: {} }
//   // TODO
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   //   const prismic = getPrismicClient({})
//   const { slug } = params
//   //   // const response = await prismic.getByUID(TODO)
//   return {
//     props: {
//       slug,
//     },
//   }
//   //   // TODO
// }
