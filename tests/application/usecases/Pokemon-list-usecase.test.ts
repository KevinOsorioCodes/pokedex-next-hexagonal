import { IPokemonListStorage } from '~/application/protocols/services'
import { right } from '~/shared/either'
import { PokemonListUsecase } from '~/application/usecases/Pokemon-list.usecase'
import { Pokemon } from '~/domain/entities'

const expectedResults = [
  { name: 'pokemon1', url: 'url1' },
  {
    name: 'pokemon2',
    url: 'url2',
  },
  {
    name: 'pokemon3',
    url: 'url3',
  },
]
describe('PokemonListUseCase', () => {
  // Tests that getPaginatedPokemons returns a list of Pokemon when the storage returns a right Either.
  it('should return a list of Pokemon when the storage returns a right Either', async () => {
    // Arrange
    const expectedPokemons: Pokemon[] = expectedResults
    const pokemonListStorageMock: IPokemonListStorage = {
      getPokemons: jest.fn().mockResolvedValue(right(expectedPokemons)),
    }
    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPokemonList()

    // Assert
    expect(result).toEqual(expectedPokemons)
  })

  // Throws an error when storage returns an error
  it('should throw an error when storage returns an error', async () => {
    const mockPokemonListStorage = {
      getPokemons: jest.fn().mockResolvedValue({
        isLeft: () => true,
        value: new Error('Error Fetching data'),
      }),
    }
    const usecase = new PokemonListUsecase(mockPokemonListStorage)
    await expect(usecase.getPokemonList()).rejects.toThrow(
      'Error Fetching data'
    )
    expect(mockPokemonListStorage.getPokemons).toHaveBeenCalledWith(1038, 0)
  })

  // Tests that getPaginatedPokemons returns a list of Pokemon when called with a limit argument and the storage returns a right Either.
  it('should return a list of Pokemon when called with a limit argument and the storage returns a right Either', async () => {
    // Arrange
    const limit = 10
    const pokemonListStorageMock: IPokemonListStorage = {
      getPokemons: jest.fn().mockResolvedValue(right(expectedResults)),
    }
    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPokemonList(limit)

    // Assert
    expect(result).toEqual(expectedResults)
  })

  // Tests that getPaginatedPokemons returns a list of Pokemon when called with an offset argument and the storage returns a right Either.
  it('should return a list of Pokemon when called with an offset argument and the storage returns a right Either', async () => {
    // Arrange

    const offset = 10
    const pokemonListStorageMock: IPokemonListStorage = {
      getPokemons: jest.fn().mockResolvedValue(right(expectedResults)),
    }
    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPokemonList(undefined, offset)

    // Assert
    expect(result).toEqual(expectedResults)
  })

  // Tests that getPaginatedPokemons returns a list of Pokemon when called with both limit and offset arguments and the storage returns a right Either.
  it('should return a list of Pokemon when called with both limit and offset arguments and the storage returns a right Either', async () => {
    // Arrange

    const limit = 10
    const offset = 10
    const pokemonListStorageMock: IPokemonListStorage = {
      getPokemons: jest.fn().mockResolvedValue(right(expectedResults)),
    }
    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPokemonList(limit, offset)

    // Assert
    expect(result).toBe(expectedResults)
  })
})
