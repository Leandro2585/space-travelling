import { Post } from '../pages'

export const formattedPosts = (posts): Post[] => {
  return posts.map((post: Post) => ({
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: {
      title: post.data.title,
      subtitle: post.data.subtitle,
      author: post.data.author,
    },
  }))
}
