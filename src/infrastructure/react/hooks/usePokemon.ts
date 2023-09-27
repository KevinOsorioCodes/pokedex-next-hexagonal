import { useState } from 'react'
import { pokemonDetailsFactory } from '~/infrastructure/factories/pokemonDetails/pokemonDetails.factory'
import { PokemonDetailsDTODto } from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'

export interface IUsePokemonDetails {
  pokemon: PokemonDetailsDTODto | null
  handleSelectPokemon: (pokemon: string) => void
}

export const usePokemon = (): IUsePokemonDetails => {
  const [pokemon, setPokemon] = useState<PokemonDetailsDTODto | null>(null)
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
    setPokemon(result)
  }
  return { pokemon, handleSelectPokemon }
}
