import { useState } from 'react'
import { pokemonDetailsFactory } from '~/infrastructure/factories/pokemonDetails/pokemonDetails.factory'
import { PokemonDetailsDTO } from '~/infrastructure/services/pokeapi'

export interface IUsePokemonDetails {
  pokemon: PokemonDetailsDTO | null
  handleSelectPokemon: (pokemon: string) => void
}

export const usePokemon = (): IUsePokemonDetails => {
  const [pokemon, setPokemon] = useState<PokemonDetailsDTO | null>(null)
  const pokemonDetailsUseCase = pokemonDetailsFactory()
  const handleSelectPokemon = async (pokemon: string) => {
    const result = await pokemonDetailsUseCase
      .getPokemon(pokemon)
      .then((res) => {
        if (res.isLeft()) {
          return null
        }
        return res.value
      })
    console.log(result)
    setPokemon(result)
  }
  return { pokemon, handleSelectPokemon }
}
