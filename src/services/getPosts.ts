import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Post } from '../pages'

export const getPosts = (posts): Post[] => {
  return posts.map(post => ({
    uid: post.uid,
    first_publication_date: format(
      new Date(post.first_publication_date),
      'dd, MMM yyyy',
      {
        locale: ptBR,
      }
    ),
    data: {
      title: post.data.title[0].text,
      subtitle: post.data.subtitle[0].text,
      author: post.data.author[0].text,
    },
  }))
}
