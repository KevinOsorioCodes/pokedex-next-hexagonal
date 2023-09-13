import { PokemonCard } from '~/infrastructure/react/ui/components/PokemonCard/PokemonCard'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { PokemonContext } from '~/infrastructure/react/context/PokemonContext'
import { IUsePokemonDetails } from '~/infrastructure/react/hooks/usePokemon'
import { Sprites } from '~/domain/entities'

interface RenderOptions {
  [p: string]: any
}

interface Props {
  providerProps: IUsePokemonDetails
  renderOptions: RenderOptions
}

const customRender = (ui: ReactNode, { providerProps }: Props) => {
  return render(
    <PokemonContext.Provider value={{ ...providerProps }}>
      {ui}
    </PokemonContext.Provider>
  )
}
describe('PokemonCard', () => {
  const pokemonData = {
    id: 1,
    name: 'Pikachu',
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',
    } as Sprites,
  }
  // Tests that the function renders a div with class 'w-full h-full flex justify-center items-center' when pokemon is truthy
  it('should render a div with class "w-full h-full flex justify-center items-center" when pokemon is truthy', () => {
    // Arrange
    // Mock the usePokemonDetailsContext hook to return a truthy value for pokemon
    /*jest.mock('~/infrastructure/react/hooks/usePokemonDetailsContext', () => ({
      usePokemonDetailsContext: jest.fn(() => ({
        pokemon: { id: 1 },
      })),
    }))*/

    // Act
    const { getByTestId } = customRender(<PokemonCard />, {
      renderOptions: {},
      providerProps: {
        pokemon: pokemonData,
        handleSelectPokemon: () => console.log(),
      },
    })

    // Assert
    expect(getByTestId('pokemon-1')).toBeInTheDocument()
    expect(getByTestId('pokemon-1')).toHaveClass(
      'w-1/3 bg-gray-950 flex flex-col h-96 justify-center items-center'
    )
  })

  // Tests that the function does not render anything when pokemon is falsy
  it('should not render anything when pokemon is falsy', () => {
    // Arrange
    // Mock the usePokemonDetailsContext hook to return a falsy value for pokemon
    const { queryByTestId } = customRender(<PokemonCard />, {
      renderOptions: {},
      providerProps: {
        pokemon: null,
        handleSelectPokemon: () => console.log(),
      },
    })
    // Act
    render(<PokemonCard />)

    // Assert
    expect(queryByTestId(/pokemon-/)).not.toBeInTheDocument()
  })

  // Tests that the function renders a div with data-testid `pokemon-${pokemon?.id}` when pokemon is truthy
  it('should render a div with data-testid `pokemon-${pokemon?.id}` when pokemon is truthy', () => {
    // Arrange
    // Mock the usePokemonDetailsContext hook to return a truthy value for pokemon
    const { getByTestId } = customRender(<PokemonCard />, {
      renderOptions: {},
      providerProps: {
        pokemon: pokemonData,
        handleSelectPokemon: () => console.log(),
      },
    })

    // Act
    render(<PokemonCard />)

    // Assert
    expect(getByTestId('pokemon-1')).toBeInTheDocument()
  })

  // Tests that the function does not render a div with data-testid `pokemon-${pokemon?.id}` when pokemon is falsy
  it('should not render a div with data-testid `pokemon-${pokemon?.id}` when pokemon is falsy', () => {
    // Arrange
    // Mock the usePokemonDetailsContext hook to return a falsy value for pokemon
    const { queryByTestId } = customRender(<PokemonCard />, {
      renderOptions: {},
      providerProps: {
        pokemon: null,
        handleSelectPokemon: () => console.log(),
      },
    })

    // Act
    render(<PokemonCard />)

    // Assert
    expect(queryByTestId(/pokemon-/)).not.toBeInTheDocument()
  })

  // Tests that the function renders an Image component when pokemon is truthy
  it('should render an Image component when pokemon is truthy', () => {
    // Arrange
    // Mock the usePokemonDetailsContext hook to return a truthy value for pokemon
    const { getByAltText } = customRender(<PokemonCard />, {
      renderOptions: {},
      providerProps: {
        pokemon: pokemonData,
        handleSelectPokemon: () => console.log(),
      },
    })

    // Act
    render(<PokemonCard />)

    // Assert
    expect(getByAltText(`${pokemonData.name}-image`)).toBeInTheDocument()
  })

  // Tests that the function does not render an Image component when pokemon is falsy
  it('should not render an Image component when pokemon is falsy', () => {
    // Arrange
    // Mock the usePokemonDetailsContext hook to return a falsy value for pokemon
    const { queryByAltText } = customRender(<PokemonCard />, {
      renderOptions: {},
      providerProps: {
        pokemon: null,
        handleSelectPokemon: () => console.log(),
      },
    })

    // Act
    render(<PokemonCard />)

    // Assert
    expect(queryByAltText(/image-/)).not.toBeInTheDocument()
  })
})
