import { render } from '@testing-library/react'
import Home from '~/pages'

describe('Home Page Test Suite', () => {
  it('should render HomePage correctly', () => {
    // Arrange
    const pokemons = [
      { name: 'pokemon', url: 'url' },
      { name: 'pokemon2', url: 'url2' },
    ]
    const { findByTestId } = render(<Home pokemons={pokemons} />)
    // Act
    const pokemonList = findByTestId('pokemon-list')
    // Assert
    expect(pokemonList).toBeDefined()
  })
})
