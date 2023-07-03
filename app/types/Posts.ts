export type PostsType = {
    datePublished: string | number | Date
    title: string
    id: string
    createdAt?: string
    comments?: {
	  message: ReactNode
	  user: any
	  user: any
	  title: ReactNode
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