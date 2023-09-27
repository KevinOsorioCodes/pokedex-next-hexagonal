import { PokemonDetailsDTODto } from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'

export interface LocalPokemonsDto {
  [pokemonName: string]: PokemonDetailsDTODto
}
