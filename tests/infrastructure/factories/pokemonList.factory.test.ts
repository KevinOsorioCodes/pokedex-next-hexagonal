import { PokemonListUsecase } from '~/application/usecases/Pokemon-list.usecase'
import { left, right } from '~/shared/either'
import { PokemonListFactory } from '~/infrastructure/factories/pokemonList/pokemonList.factory'

describe('PokemonListFactory', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  // Tests that the PokemonListFactory function returns a new instance of PokemonListUsecase.
  it('should return a new instance of PokemonListUsecase', () => {
    // Arrange
    const pokemonListStorageMock = jest.fn()
    jest.mock(
      '~/infrastructure/services/pokeapi/pokemonList/pokemon-list.service',
      () => ({
        PokemonListService: pokemonListStorageMock,
      })
    )

    // Act
    const result = PokemonListFactory()

    // Assert
    expect(result).toBeInstanceOf(PokemonListUsecase)
  })

  // Tests that the returned PokemonListUsecase instance has a getPaginatedPokemons method.
  it('should have a getPaginatedPokemons method', () => {
    // Arrange
    const pokemonListStorageMock = jest.fn()
    jest.mock(
      '~/infrastructure/services/pokeapi/pokemonList/pokemon-list.service',
      () => ({
        PokemonListService: pokemonListStorageMock,
      })
    )

    // Act
    const result = PokemonListFactory()

    // Assert
    expect(result.getPaginatedPokemons).toBeDefined()
  })

  // Tests that the getPaginatedPokemons method returns a left Either with an Error object if the result of the getPaginated method is a left Either.
  it('should return a left Either with an Error object if the result of the getPaginated method is a left Either', async () => {
    // Arrange
    const error = new Error('Data Fetching failed!! Try refreshing the page.')
    const pokemonListStorageMock = {
      getPaginated: jest.fn().mockResolvedValueOnce(left(error)),
    }

    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPaginatedPokemons()

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(error)
  })
  // Tests that the getPaginatedPokemons method returns a right Either with a list of pokemons.
  it('should return a left Either with an Error object if the result of the getPaginated method is a left Either', async () => {
    // Arrange
    const expectedPokemons = [
      { name: 'pikachu', url: 'url' },
      { name: 'charmander', url: 'url2' },
    ]
    const pokemonListStorageMock = {
      getPaginated: jest.fn().mockResolvedValueOnce(right(expectedPokemons)),
    }

    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPaginatedPokemons()

    // Assert
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expectedPokemons)
  })
})
