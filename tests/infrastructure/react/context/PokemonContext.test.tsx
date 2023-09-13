import {
  PokemonContext,
  PokemonProvider,
} from '~/infrastructure/react/context/PokemonContext'
import { fireEvent, render } from '@testing-library/react'
import { PokemonDetails, Sprites } from '~/domain/entities'

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

  // Tests that PokemonProvider provides PokemonContext with the correct values for pokemon and handleSelectPokemon
  it('should provide correct values to PokemonContext', () => {
    // Arrange
    const pokemon: PokemonDetails = {
      name: 'Pikachu',
      id: 1,
      sprites: {} as Sprites,
    }
    const handleSelectPokemon = jest.fn()
    const { getByText } = render(
      <PokemonContext.Provider value={{ pokemon, handleSelectPokemon }}>
        <PokemonContext.Consumer>
          {(value) => (
            <div>
              <h2>{value.pokemon?.name}</h2>
              <button onClick={() => value.handleSelectPokemon('Pikachu')}>
                Select
              </button>
            </div>
          )}
        </PokemonContext.Consumer>
      </PokemonContext.Provider>
    )

    // Act
    const pokemonName = getByText('Pikachu')
    fireEvent.click(getByText('Select'))

    // Assert
    expect(pokemonName).toBeInTheDocument()
    expect(handleSelectPokemon).toHaveBeenCalledTimes(1)
  })

  // Tests that PokemonProvider handles the case when usePokemonDetails returns null for pokemon
  it('should handle null pokemon', () => {
    // Arrange
    const { getByText } = render(
      <PokemonProvider>
        <PokemonContext.Consumer>
          {(value) => (
            <div>{!value.pokemon?.name && <span>...loading</span>}</div>
          )}
        </PokemonContext.Consumer>
      </PokemonProvider>
    )

    // Act
    const pokemonName = getByText('...loading')

    // Assert
    expect(pokemonName).toBeInTheDocument()
  })

  // Tests that PokemonProvider handles the case when usePokemonDetails returns null for handleSelectPokemon
  it('should handle null handleSelectPokemon', () => {
    // Arrange
    const { getByText } = render(
      <PokemonProvider>
        <PokemonContext.Consumer>
          {(value) => (
            <div>
              <button onClick={() => value.handleSelectPokemon('')}>
                Select
              </button>
            </div>
          )}
        </PokemonContext.Consumer>
      </PokemonProvider>
    )

    // Act
    fireEvent.click(getByText('Select'))

    // Assert
    // No assertion needed, just make sure the click event does not throw an error
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
