import { CategoryDTO } from '../find-all-categories/dto'

export interface OwnerDTO {
  name: string
  profile_url: string
}

export interface IngredientDTO {
  id: string
  name: string
  order: number
  quantity: number
  unit: string
}

export interface IngredientSectionDTO {
  section_name: string
  section_ingredients: IngredientDTO[]
}

export interface PreparationDTO{
  id: string
  order: number
  description: string
}

export interface PreparationSectionDTO{
  section_name: string
  section_steps: PreparationDTO[]
}

export interface RecipeDetailDTO {
  id: string
  name: string
  likes_count: number
  visualization_count: number
  preparation_time: number
  liked: boolean
  visualized: boolean
  photos_url: String[]
  owner: OwnerDTO
  categories: CategoryDTO[]
  ingredients: IngredientSectionDTO[]
  preparation: PreparationSectionDTO[]
}
