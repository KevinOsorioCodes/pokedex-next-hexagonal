export interface SpritesDTO {
  back_default?: string | null
  back_female?: string | null
  back_shiny?: string | null
  back_shiny_female?: string | null
  front_default?: string | null
  front_female?: string | null
  front_shiny?: string | null
  front_shiny_female?: string | null
}

export interface AbilityDetailsDTO {
  name: string
  url: string
}

export interface AbilityDTO {
  is_hidden: boolean
  slot: number
  ability: AbilityDetailsDTO
}

export interface TypeDetailsDTO {
  name: string
  url: string
}

export interface TypeDTO {
  slot: number
  type: TypeDetailsDTO
}

export interface StatDTO {
  base_stat: number
  effort: number
  stat: StatDetail
}

export interface StatDetail {
  name: string
  url: string
}

export interface PokemonDetailsDTODto {
  id: number
  name: string
  sprites: SpritesDTO
  abilities: AbilityDTO[]
  types: TypeDTO[]
  stats: StatDTO[]
}
