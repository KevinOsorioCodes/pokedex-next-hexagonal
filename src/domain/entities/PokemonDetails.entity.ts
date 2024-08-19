export interface Sprites {
  back_default?: string | null
  back_female?: string | null
  back_shiny?: string | null
  back_shiny_female?: string | null
  front_default?: string | null
  front_female?: string | null
  front_shiny?: string | null
  front_shiny_female?: string | null
}

export interface Ability {
  name: string
  url: string
}

export interface Type {
  name: string
  url: string
}

export interface AbilityDTO {
  is_hidden: boolean
  slot: number
  ability: Ability
}

export interface TypeDTO {
  slot: number
  type: Type
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
export interface PokemonDetails {
  id: number
  name: string
  sprites: Sprites
  abilities: AbilityDTO[]
  types: TypeDTO[]
  stats: StatDTO[]
}
