import { render } from '@testing-library/react'
import { HomeView } from '~/infrastructure/react/ui/views/Home.view'

import mockRouter from 'next-router-mock'
import { labels } from '~/shared/labels'
import { providerWrapper } from '~/tests/__mocks__/Wrappers'

jest.mock('next/router', () => jest.requireActual('next-router-mock'))

describe('HomeView Test Suite', () => {
  it('should render a list of pokemons', () => {
    mockRouter.push('/')

    const { findByTestId } = render(<HomeView />, {
      wrapper: providerWrapper,
    })
    const pokemonList = findByTestId('pokedex-list')
    const pokemon1 = findByTestId(`pokemon-bulbasaur`)
    const pokemon2 = findByTestId(`pokemon-charizard`)
    // Act & Assert
    expect(pokemonList).toBeDefined()
    expect(pokemon1).toBeDefined()
    expect(pokemon2).toBeDefined()
  })
  it('should render an empty list', () => {
    // Arrange
    const { getByText } = render(<HomeView />, { wrapper: providerWrapper })
    const pokemonList = getByText(labels.home.subtitle)
    // Act & Assert
    expect(pokemonList).toBeDefined()
  })
})
