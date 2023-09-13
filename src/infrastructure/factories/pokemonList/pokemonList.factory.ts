import { PokemonListService } from '~/infrastructure/services/pokeapi/pokemonList/pokemon-list.service'
import { PokemonListUsecase } from '~/application/usecases/Pokemon-list.usecase'

export const PokemonListFactory = () => {
  const pokemonListStorage = new PokemonListService()
  return new PokemonListUsecase(pokemonListStorage)
}
