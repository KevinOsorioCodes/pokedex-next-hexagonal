import { createContext, FC, ReactNode } from 'react'
import {
  IUsePokemonDetails,
  usePokemon,
} from '~/infrastructure/react/hooks/usePokemon'

export const PokemonContext = createContext<IUsePokemonDetails>({
  pokemon: null,
  handleSelectPokemon: () => null,
})

export const PokemonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { pokemon, handleSelectPokemon } = usePokemon()
  return (
    <PokemonContext.Provider value={{ pokemon, handleSelectPokemon }}>
      {children}
    </PokemonContext.Provider>
  )
}
