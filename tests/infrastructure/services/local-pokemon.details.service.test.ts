import { PokemonDetailsService } from '~/infrastructure/services/localApi/PokemonDetails/pokemon-details.service'
import { right } from '~/shared/either'
import {
  PokemonDetailsDTODto,
  SpritesDTO,
} from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'
import { AbilityDTO, PokemonDetails, TypeDTO } from '~/domain/entities'

describe('PokemonDetailsService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  // Should be able to get a list of saved pokemons
  it('should return a list of saved pokemons when getPokemons is called', async () => {
    // Arrange
    const pokemonDetailsService = new PokemonDetailsService()
    const mockLocalStorage = jest.spyOn(localStorage, 'getItem')
    mockLocalStorage.mockReturnValue(
      JSON.stringify({
        pikachu: {
          id: 25,
          name: 'pikachu',
          sprites: {},
          abilities: [],
          types: [],
        },
      })
    )

    // Act
    const result = await pokemonDetailsService.getPokemons()

    // Assert
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      pikachu: {
        id: 25,
        name: 'pikachu',
        sprites: {},
        abilities: [],
        types: [],
      },
    })
    expect(mockLocalStorage).toHaveBeenCalledWith('pokemons')
  })

  // Should be able to find a pokemon by name
  it('should return the pokemon details when findOne is called with a valid name', async () => {
    // Arrange
    const pokemonDetailsService = new PokemonDetailsService()
    const mockGetPokemons = jest.spyOn(pokemonDetailsService, 'getPokemons')
    mockGetPokemons.mockResolvedValue(
      right({
        pikachu: {
          id: 25,
          name: 'pikachu',
          sprites: {} as SpritesDTO,
          abilities: [] as AbilityDTO[],
          types: [] as TypeDTO[],
        } as PokemonDetailsDTODto,
      })
    )

    // Act
    const result = await pokemonDetailsService.findOne('pikachu')

    // Assert
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      id: 25,
      name: 'pikachu',
      sprites: {},
      abilities: [],
      types: [],
    })
    expect(mockGetPokemons).toHaveBeenCalled()
  })

  // Should be able to save a new pokemon
  it('should save the new pokemon and return it when save is called', async () => {
    // Arrange
    const pokemonDetailsService = new PokemonDetailsService()
    const mockGetPokemons = jest.spyOn(pokemonDetailsService, 'getPokemons')
    mockGetPokemons.mockResolvedValue(right({}))

    const mockLocalStorage = jest.spyOn(localStorage, 'setItem')

    const newPokemon = {
      id: 25,
      name: 'pikachu',
      sprites: {},
      abilities: [] as AbilityDTO[],
      types: [] as TypeDTO[],
    } as PokemonDetails

    // Act
    const result = await pokemonDetailsService.save(newPokemon)

    // Assert
    expect(result).toEqual(newPokemon)
    expect(mockGetPokemons).toHaveBeenCalled()
    expect(mockLocalStorage).toHaveBeenCalledWith(
      'pokemons',
      JSON.stringify({
        pikachu: {
          id: 25,
          name: 'pikachu',
          sprites: {},
          abilities: [],
          types: [],
        },
      })
    )
  })

  // Should return an error if there are no saved pokemons
  it('should return an error when getPokemons is called and there are no saved pokemons', async () => {
    // Arrange
    const pokemonDetailsService = new PokemonDetailsService()
    const mockLocalStorage = jest.spyOn(localStorage, 'getItem')
    mockLocalStorage.mockReturnValue(null)

    // Act
    const result = await pokemonDetailsService.getPokemons()

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
    expect(result.value.message).toBe('There are no saved pokemons')
    expect(mockLocalStorage).toHaveBeenCalledWith('pokemons')
  })

  // Should return an error if a pokemon is not found
  it('should return an error when findOne is called with an invalid name', async () => {
    // Arrange
    const expectedError = new Error('Pokemon charizard not Found')
    const pokemonDetailsService = new PokemonDetailsService()
    const mockGetPokemons = jest.spyOn(pokemonDetailsService, 'getPokemons')
    mockGetPokemons.mockResolvedValue(right({}))

    // Act
    const result = await pokemonDetailsService.findOne('charizard')

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
    expect(result.value).toStrictEqual(expectedError)
    expect(mockGetPokemons).toHaveBeenCalled()
  })

  // Should return an error if something goes wrong
  it('should return an error when findPokemon is called and something goes wrong', async () => {
    // Arrange
    const pokemonDetailsService = new PokemonDetailsService()
    const mockLocalStorage = jest.spyOn(localStorage, 'getItem')
    mockLocalStorage.mockReturnValue(null)

    // Act
    const result = await pokemonDetailsService.findOne('pokemon')

    // Assert
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
    expect(result.value).toStrictEqual(new Error('something wrong'))
    expect(mockLocalStorage).toHaveBeenCalledWith('pokemons')
  })
  it('should save a new pokemon to local storage when getPokemons() succeeds', async () => {
    // Arrange
    const newPokemon = {
      id: 25,
      name: 'pikachu',
      sprites: {},
      abilities: [] as AbilityDTO[],
      types: [] as TypeDTO[],
    } as PokemonDetails
    const pokemonDetailsService = new PokemonDetailsService()
    // Act
    await pokemonDetailsService.save(newPokemon)

    // Assert
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'pokemons',
      JSON.stringify({ pikachu: newPokemon })
    )
  })
})
