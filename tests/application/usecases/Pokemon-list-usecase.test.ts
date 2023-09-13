import { IPokemonListStorage } from '~/application/protocols/services'
import { left, right } from 'src/shared/either'
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
      getPaginated: jest.fn().mockResolvedValue(right(expectedPokemons)),
    }
    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPaginatedPokemons()

    // Assert
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expectedPokemons)
  })

  // Tests that getPaginatedPokemons returns a left Either with an Error message when the storage returns a left Either.
  it('should return a left Either with an Error message when the storage returns a left Either', async () => {
    // Arrange
    const error = new Error('Data Fetching failed!! Try refreshing the page.')
    const pokemonListStorageMock: IPokemonListStorage = {
      getPaginated: jest.fn().mockResolvedValue(left(error)),
    }
    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPaginatedPokemons()

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(error)
  })

  // Tests that getPaginatedPokemons returns a left Either with an Error message when the storage throws an error.
  it('should return a left Either with an Error message when the storage throws an error', async () => {
    // Arrange
    const pokemonListStorageMock: IPokemonListStorage = {
      getPaginated: jest
        .fn()
        .mockResolvedValueOnce(
          left(new Error('Data Fetching failed!! Try refreshing the page.'))
        ),
    }
    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPaginatedPokemons()
    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toEqual(
      new Error('Data Fetching failed!! Try refreshing the page.')
    )
  })

  // Tests that getPaginatedPokemons returns a list of Pokemon when called with a limit argument and the storage returns a right Either.
  it('should return a list of Pokemon when called with a limit argument and the storage returns a right Either', async () => {
    // Arrange
    const limit = 10
    const pokemonListStorageMock: IPokemonListStorage = {
      getPaginated: jest.fn().mockResolvedValue(right(expectedResults)),
    }
    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPaginatedPokemons(limit)

    // Assert
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expectedResults)
  })

  // Tests that getPaginatedPokemons returns a list of Pokemon when called with an offset argument and the storage returns a right Either.
  it('should return a list of Pokemon when called with an offset argument and the storage returns a right Either', async () => {
    // Arrange

    const offset = 10
    const pokemonListStorageMock: IPokemonListStorage = {
      getPaginated: jest.fn().mockResolvedValue(right(expectedResults)),
    }
    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPaginatedPokemons(
      undefined,
      offset
    )

    // Assert
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expectedResults)
  })

  // Tests that getPaginatedPokemons returns a list of Pokemon when called with both limit and offset arguments and the storage returns a right Either.
  it('should return a list of Pokemon when called with both limit and offset arguments and the storage returns a right Either', async () => {
    // Arrange

    const limit = 10
    const offset = 10
    const pokemonListStorageMock: IPokemonListStorage = {
      getPaginated: jest.fn().mockResolvedValue(right(expectedResults)),
    }
    const pokemonListUseCase = new PokemonListUsecase(pokemonListStorageMock)

    // Act
    const result = await pokemonListUseCase.getPaginatedPokemons(limit, offset)

    // Assert
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(expectedResults)
  })
})
