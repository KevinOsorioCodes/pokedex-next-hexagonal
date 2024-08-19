import { useState } from 'react'
import { pokemonDetailsFactory } from '~/infrastructure/factories/pokemonDetails/pokemonDetails.factory'
import { PokemonDetailsDTODto } from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'

export interface IUsePokemonDetails {
  pokemon: PokemonDetailsDTODto | null
  handleSelectPokemon: (pokemon: string) => Promise<void>
}

export const usePokemon = (): IUsePokemonDetails => {
  const [pokemon, setPokemon] = useState<PokemonDetailsDTODto | null>(null)
  const pokemonDetailsUseCase = pokemonDetailsFactory()
  const handleSelectPokemon = async (pokemonName: string) => {
    const result = await pokemonDetailsUseCase
      .getPokemon(pokemonName)
      .then((res) => {
        if (res.isLeft()) {
          return null
        }
        return res.value
      })
    setPokemon(result)
  }
  return { pokemon, handleSelectPokemon }
}
