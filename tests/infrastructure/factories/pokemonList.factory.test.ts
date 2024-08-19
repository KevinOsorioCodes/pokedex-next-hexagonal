import { PokemonListUsecase } from '~/application/usecases/Pokemon-list.usecase'
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
    expect(result.getPokemonList).toBeDefined()
  })
  // Tests that the getPaginatedPokemons method returns a right Either with a list of pokemons.
  it('should return a left Either with an Error object if the result of the getPaginated method is a left Either', async () => {
    // Arrange
    const pokemonListStorageMock = {
      getPokemons: jest.fn().mockResolvedValueOnce({
        isLeft: () => true,
        value: new Error('Error Fetching data'),
      }),
    }

    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act

    // Assert
    await expect(pokemonListUseCase.getPokemonList()).rejects.toThrow(
      'Error Fetching data'
    )
  })
})
