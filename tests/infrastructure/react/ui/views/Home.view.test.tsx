import { render } from '@testing-library/react'
import { HomeView } from '~/infrastructure/react/ui/views/Home.view'
import { Pokemon } from '~/domain/entities'

describe('HomeView Test Suite', () => {
  it('should render a list of pokemons', () => {
    // Arrange
    const pokemons = [
      { name: 'pokemon1', url: 'url1' },
      { name: 'pokemon2', url: 'url2' },
    ]
    const { findByTestId } = render(<HomeView pokemons={pokemons} />)
    const pokemonList = findByTestId('pokedex-list')
    const pokemon1 = findByTestId(`pokemon-${pokemons[0].name}}`)
    const pokemon2 = findByTestId(`pokemon-${pokemons[1].name}}`)
    // Act & Assert
    expect(pokemonList).toBeDefined()
    expect(pokemon1).toBeDefined()
    expect(pokemon2).toBeDefined()
  })
  it('should render an empty list', () => {
    // Arrange
    const pokemons = [] as Pokemon[]
    const { findByText } = render(<HomeView pokemons={pokemons} />)
    const pokemonList = findByText('loading...')
    // Act & Assert
    expect(pokemonList).toBeDefined()
  })
})
