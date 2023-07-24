export type IQuestion = {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  isDeleted: boolean
  answerCount: number
  createdAt: string
}

export type IRegisterUser = {
  username: string
  nickname?: string
  password: string
  remember?: boolean
}
