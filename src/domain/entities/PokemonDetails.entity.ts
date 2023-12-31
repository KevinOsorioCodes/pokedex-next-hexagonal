export interface Sprites {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
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

export interface PokemonDetails {
  id: number
  name: string
  sprites: Sprites
  abilities: AbilityDTO[]
  types: TypeDTO[]
}
