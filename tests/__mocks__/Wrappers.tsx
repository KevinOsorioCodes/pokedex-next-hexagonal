import { FC, PropsWithChildren } from 'react'
import { AppRouterContextProviderMock } from '~/tests/__mocks__/app-router-context-provider-mock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  PokedexDispatchContext,
  PokedexStateContext,
} from '~/infrastructure/react/context/PokemonContext'
import { pokedexStateMock } from '~/tests/__mocks__/pokedexState.mock'

const push = jest.fn()

export const providerWrapper: FC<PropsWithChildren> = ({ children }) => (
  <AppRouterContextProviderMock router={{ push }}>
    <QueryClientProvider client={new QueryClient()}>
      <PokedexStateContext.Provider value={pokedexStateMock}>
        <PokedexDispatchContext.Provider value={jest.fn()}>
          {children}
        </PokedexDispatchContext.Provider>
      </PokedexStateContext.Provider>
    </QueryClientProvider>
  </AppRouterContextProviderMock>
)
