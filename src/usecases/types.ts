export interface UserDTO {
  id: string
  email: string
  name: string
  picture: string
}

export interface Page {
  limit: number
  offset: number
}

export interface ResponsePage<T> {
  total: number
  data: T[]
}

export interface RecipeDTO {
  id: string
  name: string
  likes_count: number
  visualization_count: number
  preparation_time: number
  liked: boolean
  visualized: boolean
  photos_url: String[]
  recipe_detail_url: string
  toggle_like_url: string
}
