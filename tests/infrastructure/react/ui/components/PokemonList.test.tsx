import { render } from '@testing-library/react'
import PokemonList from '~/infrastructure/react/ui/components/PokemonList'
import {
  PokedexDispatchContext,
  PokedexStateContext,
} from '~/infrastructure/react/context/PokemonContext'
import { pokedexStateMock } from '~/tests/__mocks__/pokedexState.mock'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

describe('Index Test Suite', () => {
  it('should return a section element ', () => {
    const { getByTestId } = render(<PokemonList />)
    const pokemonList = getByTestId('pokemon-list')
    const searchBar = getByTestId('search-bar')
    expect(pokemonList).toBeInTheDocument()
    expect(searchBar).toBeInTheDocument()
  })

  it('should return a list of pokemons when given a array of pokemons', () => {
    const queryClientMock = new QueryClient()
    const mockDispatch = jest.fn()
    const { getByTestId } = render(<PokemonList />, {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClientMock}>
          <PokedexStateContext.Provider value={pokedexStateMock}>
            <PokedexDispatchContext.Provider value={mockDispatch}>
              {children}
            </PokedexDispatchContext.Provider>
          </PokedexStateContext.Provider>
        </QueryClientProvider>
      ),
    })
    const bulbasaur = getByTestId('title-bulbasaur')
    const charmander = getByTestId('title-charmander')
    expect(bulbasaur).toBeInTheDocument()
    expect(charmander).toBeInTheDocument()
  })
})
