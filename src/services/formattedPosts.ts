import { Post } from '../pages'

export const formattedPosts = (posts): Post[] => {
  return posts.map(post => ({
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: {
      title:
        typeof post.data.title === 'string'
          ? post.data.title
          : post.data.title[0].text,
      subtitle:
        typeof post.data.subtitle === 'string'
          ? post.data.subtitle
          : post.data.subtitle[0].text,
      author:
        typeof post.data.author === 'string'
          ? post.data.author
          : post.data.author[0].text,
    },
  }))
}
