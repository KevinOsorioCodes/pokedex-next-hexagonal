import { PokemonListService } from '~/infrastructure/services/pokeapi/pokemonList/pokemon-list.service'
import { left, right } from '~/shared/either'
import pokeapi, {
  validateStatus,
} from '~/infrastructure/services/pokeapi/pokeapi'
import endpoints from '~/infrastructure/services/pokeapi/endpoints'

describe('PokemonListService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should return true when called with status < 400', () => {
    // Arrange
    const expected = true
    const input = 200
    // Act
    const result = validateStatus(input)
    //Assert
    expect(result).toBe(expected)
  })
  it('should return false when called with status > 400', () => {
    // Arrange
    const expected = false
    const input = 400
    // Act
    const result = validateStatus(input)
    //Assert
    expect(result).toBe(expected)
  })
  // Tests that the getPaginated method returns a list of Pokemon when called with valid limit and offset parameters
  it('should return a list of Pokemon when called with valid limit and offset parameters', async () => {
    // Arrange
    const limit = 10
    const offset = 20
    const expectedPokemons = [
      { name: 'pokemon1', url: 'url1' },
      { name: 'pokemon2', url: 'url2' },
      { name: 'pokemon3', url: 'url3' },
    ]
    jest
      .spyOn(pokeapi, 'get')
      .mockResolvedValue({ data: { results: expectedPokemons } })

    const pokemonListService = new PokemonListService()

    // Act
    const result = await pokemonListService.getPaginated(limit, offset)

    // Assert
    expect(result).toEqual(right(expectedPokemons))
    expect(pokeapi.get).toHaveBeenCalledWith(endpoints.pokemons, {
      params: { limit, offset },
    })
  })

  // Tests that the getPaginated method returns a list of 40 Pokemon when called with no parameters
  it('should return a list of 40 Pokemon when called with no parameters', async () => {
    // Arrange
    const expectedPokemons = [
      { name: 'pokemon1', url: 'url1' },
      { name: 'pokemon2', url: 'url2' },
      { name: 'pokemon3', url: 'url3' },
    ]
    jest
      .spyOn(pokeapi, 'get')
      .mockResolvedValue({ data: { results: expectedPokemons } })

    const pokemonListService = new PokemonListService()

    // Act
    const result = await pokemonListService.getPaginated()

    // Assert
    expect(result).toEqual(right(expectedPokemons))
    expect(pokeapi.get).toHaveBeenCalledWith(endpoints.pokemons, {
      params: { limit: 40, offset: 0 },
    })
  })

  // Tests that the getPaginated method returns a list of Pokemon with correct name and url properties
  it('should return a list of Pokemon with correct name and url properties', async () => {
    // Arrange
    const expectedPokemons = [
      { name: 'pokemon1', url: 'url1' },
      { name: 'pokemon2', url: 'url2' },
      { name: 'pokemon3', url: 'url3' },
    ]
    jest
      .spyOn(pokeapi, 'get')
      .mockResolvedValue({ data: { results: expectedPokemons }, status: 200 })

    const pokemonListService = new PokemonListService()

    // Act
    const result = await pokemonListService.getPaginated()

    // Assert
    expect(result).toEqual(right(expectedPokemons))
    expect(pokeapi.get).toHaveBeenCalledWith(endpoints.pokemons, {
      params: { limit: 40, offset: 0 },
    })
  })

  // Tests that the getPaginated method returns an error when called with a negative limit parameter
  it('should return an error when called with a negative limit parameter', async () => {
    // Arrange
    const limit = -1
    const offset = 0
    const expectedError = new Error(`Invalid limit parameter: ${limit}`)
    jest.spyOn(pokeapi, 'get')

    const pokemonListService = new PokemonListService()

    // Act
    const result = await pokemonListService.getPaginated(limit, offset)

    // Assert
    expect(result).toEqual(left(expectedError))
    expect(pokeapi.get).not.toHaveBeenCalled()
  })

  // Tests that the getPaginated method returns an error when called with a negative offset parameter
  it('should return an error when called with a negative offset parameter', async () => {
    // Arrange
    const limit = 40
    const offset = -1
    const expectedError = new Error(`Invalid offset parameter: ${offset}`)
    jest.spyOn(pokeapi, 'get')

    const pokemonListService = new PokemonListService()

    // Act
    const result = await pokemonListService.getPaginated(limit, offset)

    // Assert
    expect(result).toEqual(left(expectedError))
    expect(pokeapi.get).not.toHaveBeenCalled()
  })

  // Tests that the getPaginated method returns an error when the API call fails
  it('should return an error when the API call fails', async () => {
    // Arrange
    const limit = 40
    const offset = 0
    const expectedError = new Error('API failed with status: 500')
    jest
      .spyOn(pokeapi, 'get')
      .mockRejectedValueOnce({ response: { status: 500 } })

    const pokemonListService = new PokemonListService()

    // Act
    const result = await pokemonListService.getPaginated(limit, offset)

    // Assert
    expect(result).toEqual(left(expectedError))
    expect(pokeapi.get).toHaveBeenCalledWith(endpoints.pokemons, {
      params: { limit, offset },
    })
  })
})
