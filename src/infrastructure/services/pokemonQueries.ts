import { PokemonListFactory } from '~/infrastructure/factories'
import { pokemonDetailsFactory } from '~/infrastructure/factories/pokemonDetails/pokemonDetails.factory'
import { Pokedex } from '~/infrastructure/react/reducers/pokedex.reducer'

export const pokemonList = async () => {
  const pokemonListFactory = PokemonListFactory()
  return await pokemonListFactory.getPokemonList()
}

export interface GetPokemonQueryParam {
  limit: number
  start: number
}

export const getPokemon = async (pokedex: Pokedex, name: string) => {
  const pokemonDetailUseCase = pokemonDetailsFactory()
  const pokemon = pokedex[name]
  if (pokemon) {
    return pokemon
  }
  const result = await pokemonDetailUseCase.getPokemon(name)
  if (result.isRight()) {
    return result.value
  } else {
    throw new Error('Failed Fetching ' + name)
  }
}
