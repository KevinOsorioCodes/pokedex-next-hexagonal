import { useContext } from 'react'
import {
  PokedexDispatchContext,
  PokedexStateContext,
} from '~/infrastructure/react/context/PokemonContext'
import { PokedexState } from '~/infrastructure/react/reducers/pokedex.reducer'

export const usePokedexState = (): PokedexState => {
  return useContext(PokedexStateContext)
}

export const usePokedexDispatch = () => {
  return useContext(PokedexDispatchContext)
}
