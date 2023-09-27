export interface SpritesDTO {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
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

export interface PokemonDetailsDTODto {
  id: number
  name: string
  sprites: SpritesDTO
  abilities: AbilityDTO[]
  types: TypeDTO[]
}
