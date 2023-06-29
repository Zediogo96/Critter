export type PostsType = {
    datePublished: string | number | Date
    title: string
    id: string
    createdAt?: string
    comments?: {
      createdAt: string
      id: string
      postId: string
      userId: string
    }[]
    user: {
      name: string
      image: string
    }
    likes?: {
      createdAt: string
      id: string
      postId: string
      userId: string
    }[]
    liked?: boolean,
    image?: string
  }