import { createContext, Dispatch, FC, ReactNode, useReducer } from 'react'
import {
  initialPokedex,
  PokedexAction,
  pokedexReducer,
  PokedexState,
} from '~/infrastructure/react/reducers/pokedex.reducer'

export const PokedexStateContext = createContext<PokedexState>(initialPokedex)
export const PokedexDispatchContext = createContext<Dispatch<PokedexAction>>(
  () => null
)
export const PokemonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [pokedexState, dispatch] = useReducer(pokedexReducer, initialPokedex)
  return (
    <PokedexStateContext.Provider value={pokedexState}>
      <PokedexDispatchContext.Provider value={dispatch}>
        {children}
      </PokedexDispatchContext.Provider>
    </PokedexStateContext.Provider>
  )
}
