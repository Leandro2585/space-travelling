import Head from 'next/head'
import { FiUser, FiCalendar } from 'react-icons/fi'
import Header from '../components/Header'
import commonStyles from '../styles/common.module.scss'

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

export default function Home(a: HomeProps) {
  return (
    <>
      <Head>
        <title>Space Travelling</title>
      </Head>
      <main className={commonStyles.home_container}>
        <Header />
        <section>
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div key={_} className={commonStyles.post_preview}>
              <h1>Criando um app CRA do zero</h1>
              <p>
                Tudo sobre como criar a sua primeira aplicação utilizando Create
                React App
              </p>
              <div className={commonStyles.info}>
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
          ))}
        </section>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  // const prismic = getPrismicClient({});
  // const postsResponse = await prismic.getByType(TODO);
  // TODO
  return { props: {} }
}
