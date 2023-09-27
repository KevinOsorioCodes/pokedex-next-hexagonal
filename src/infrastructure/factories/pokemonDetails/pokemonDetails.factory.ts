import { PokemonDetailsService } from '~/infrastructure/services/pokeapi'
import { PokemonDetailsService as LocalPokemonDetailsService } from '~/infrastructure/services/localApi/PokemonDetails/pokemon-details.service'
import { PokemonDetailsUsecase } from '~/application/usecases'

export const pokemonDetailsFactory = () => {
  const pokemonDetailsStorage = new PokemonDetailsService()
  const localPokemonDetailsStorage = new LocalPokemonDetailsService()
  return new PokemonDetailsUsecase(
    pokemonDetailsStorage,
    localPokemonDetailsStorage
  )
}
