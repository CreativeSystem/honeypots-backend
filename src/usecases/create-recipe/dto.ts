import { UserDTO } from '../types'

export interface CategoryDTO {
  id: string
  name: string
}

export interface IngredientDTO {
  name: string
  order: number
  quantity: number
  unit: string
}

export interface IngredientSectionDTO {
  section_name: string
  section_ingredients: IngredientDTO
}

export interface PreparationDTO{
  order: number
  description: string
}

export interface PreparationSectionDTO{
  section_name: string
  section_steps: PreparationDTO
}

export interface CreateRecipeDTO{
  name: string
  description: string
  preparation_time: number
  categories: CategoryDTO[]
  ingredients: IngredientSectionDTO[]
  preparation: PreparationSectionDTO[]
  owner: UserDTO
}

export interface CreatedRecipeDTO {
  id: string
}
