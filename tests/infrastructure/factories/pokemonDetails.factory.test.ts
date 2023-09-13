import { PokemonDetailsUsecase } from '~/application/usecases'
import { left, right } from 'src/shared/either'
import { pokemonDetailsFactory } from '~/infrastructure/factories/pokemonDetails/pokemonDetails.factory'
import { PokemonDetails, Sprites } from '~/domain/entities'

describe('PokemonDetailsFactory', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  // Tests that the PokemonListFactory function returns a new instance of PokemonListUsecase.
  it('should return a new instance of PokemonDetailsUsecase', () => {
    // Arrange
    const pokemonDetailsStorageMock = jest.fn()
    jest.mock(
      '~/infrastructure/services/pokeapi/pokemonDetails/pokemon-details.service.ts',
      () => ({
        PokemonDetailsService: pokemonDetailsStorageMock,
      })
    )

    // Act
    const result = pokemonDetailsFactory()

    // Assert
    expect(result).toBeInstanceOf(PokemonDetailsUsecase)
  })

  // Tests that the returned PokemonListUsecase instance has a getPaginatedPokemons method.
  it('should have a get method', () => {
    // Arrange
    const pokemonDetailsStorageMock = jest.fn()
    jest.mock(
      '~/infrastructure/services/pokeapi/pokemonDetails/pokemon-details.service.ts',
      () => ({
        PokemonDetailsService: pokemonDetailsStorageMock,
      })
    )

    // Act
    const result = pokemonDetailsFactory()

    // Assert
    expect(result.getPokemon).toBeDefined()
  })

  // Tests that the getPaginatedPokemons method returns a left Either with an Error object if the result of the getPaginated method is a left Either.
  it('should return a left Either with an Error object if the result of the findOne method is a left Either', async () => {
    // Arrange
    const error = new Error('Error Fetching data')
    const pokemonDetailsStorageMock = {
      findOne: jest.fn().mockResolvedValueOnce(left(error)),
    }

    const pokemonListUseCase = new PokemonDetailsUsecase(
      pokemonDetailsStorageMock
    )

    // Act
    const result = await pokemonListUseCase.getPokemon('pokemon')

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(error)
  })
  // Tests that the getPaginatedPokemons method returns a right Either with a list of pokemons.
  it('should return a right Either with a pokemon', async () => {
    // Arrange
    const expectedPokemon: PokemonDetails = {
      id: 1,
      name: 'pokemon',
      sprites: {} as Sprites,
    }
    const pokemonDetailsStorageMock = {
      findOne: jest.fn().mockResolvedValueOnce(right(expectedPokemon)),
    }

    const pokemonListUseCase = new PokemonDetailsUsecase(
      pokemonDetailsStorageMock
    )

    // Act
    const result = await pokemonListUseCase.getPokemon('pokemon')

    // Assert
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expectedPokemon)
  })
})
