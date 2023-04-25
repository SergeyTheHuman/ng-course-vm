export interface IPost {
   author: string
   text: string
   comments: IComment[]
}

interface IComment {
   author: string
   text: string
}
