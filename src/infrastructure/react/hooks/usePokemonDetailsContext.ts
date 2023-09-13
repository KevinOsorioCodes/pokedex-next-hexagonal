import { useContext } from 'react'
import { PokemonContext } from '~/infrastructure/react/context/PokemonContext'

export const usePokemonDetailsContext = () => {
  const { pokemon, handleSelectPokemon } = useContext(PokemonContext)
  return {
    pokemon,
    handleSelectPokemon,
  }
}
