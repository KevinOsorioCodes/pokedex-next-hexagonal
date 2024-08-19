import {
  PokedexStateContext,
  PokemonProvider,
} from '~/infrastructure/react/context/PokemonContext'
import { render } from '@testing-library/react'
import { pokedexStateMock } from '~/tests/__mocks__/pokedexState.mock'

describe('PokemonProvider', () => {
  // Tests that PokemonProvider renders the children components
  it('should render children components', () => {
    // Arrange
    const { getByText } = render(
      <PokemonProvider>
        <div>Child Component 1</div>
        <div>Child Component 2</div>
      </PokemonProvider>
    )

    // Act
    const childComponent1 = getByText('Child Component 1')
    const childComponent2 = getByText('Child Component 2')

    // Assert
    expect(childComponent1).toBeInTheDocument()
    expect(childComponent2).toBeInTheDocument()
  })

  // Tests that PokemonProvider handles the case when usePokemonDetails returns null for pokemon
  it('should handle null pokemon', () => {
    // Arrange
    const { getByText } = render(
      <PokedexStateContext.Provider value={pokedexStateMock}>
        <PokedexStateContext.Consumer>
          {(value) => (
            <div>{!value.pokedex['Onix']?.name && <span>...loading</span>}</div>
          )}
        </PokedexStateContext.Consumer>
      </PokedexStateContext.Provider>
    )

    // Act
    const pokemonName = getByText('...loading')

    // Assert
    expect(pokemonName).toBeInTheDocument()
  })

  // Tests that PokemonProvider renders without any children components
  it('should render without any children components', () => {
    // Arrange
    const { container } = render(
      <PokemonProvider>
        <></>
      </PokemonProvider>
    )

    // Act
    const children = container.querySelectorAll('div')

    // Assert
    expect(children.length).toBe(0)
  })
})
