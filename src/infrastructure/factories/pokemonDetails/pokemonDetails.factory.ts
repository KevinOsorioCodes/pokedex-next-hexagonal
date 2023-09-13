import { PokemonDetailsService } from '~/infrastructure/services/pokeapi'
import { PokemonDetailsUsecase } from '~/application/usecases'

export const pokemonDetailsFactory = () => {
  const pokemonDetailsStorage = new PokemonDetailsService()
  return new PokemonDetailsUsecase(pokemonDetailsStorage)
}
