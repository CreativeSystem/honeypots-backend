import { Page, ResponsePage } from '../types'

export interface RecipeDTO {
  id: string
  name: string
  photos_url: string[]
}

export interface SearchRequest extends Page {
  searchTerm: string
}

export interface SearchResponse<T> extends ResponsePage<T>{
  auto_correction: string[]
}
