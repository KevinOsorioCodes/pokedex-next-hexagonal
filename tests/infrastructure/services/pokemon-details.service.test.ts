import { AbilityDTO, PokemonDetails, Sprites, TypeDTO } from '~/domain/entities'
import { PokemonDetailsService } from '~/infrastructure/services/pokeapi/pokemonDetails/pokemon-details.service'
import { Left, Right, right } from '~/shared/either'
import endpoints from '~/infrastructure/services/pokeapi/endpoints'
import pokeapi from '~/infrastructure/services/pokeapi/pokeapi'
import {
  PokemonDetailsDTODto,
  SpritesDTO,
} from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'

describe('PokemonDetailsService', () => {
  // Tests that findOne method returns a PokemonDetails object when a valid name is passed
  it('should return a PokemonDetails object when a valid name is passed', async () => {
    // Arrange
    const name = 'validName'
    const expectedPokemonDetails: PokemonDetails = {
      id: 1,
      name: 'validName',
      sprites: {
        front_default: 'validUrl',
        back_default: 'validUrl',
      } as Sprites,
      abilities: [] as AbilityDTO[],
      types: [] as TypeDTO[],
    }
    jest
      .spyOn(pokeapi, 'get')
      .mockResolvedValue({ data: expectedPokemonDetails })

    const pokemonDetailsService = new PokemonDetailsService()

    // Act
    const result = await pokemonDetailsService.findOne(name)

    // Assert
    expect(result).toEqual(right(expectedPokemonDetails))
    expect(pokeapi.get).toHaveBeenCalledWith(`${endpoints.pokemons}/${name}`)
  })

  // Tests that findOne method returns a Right Either object when a valid name is passed
  it('should return a Right Either object when a valid name is passed', async () => {
    // Arrange
    const name = 'validName'
    const expectedPokemonDetails: PokemonDetails = {
      id: 1,
      name: 'validName',
      sprites: {
        front_default: 'validUrl',
        back_default: 'validUrl',
      } as Sprites,
      abilities: [] as AbilityDTO[],
      types: [] as TypeDTO[],
    }
    jest
      .spyOn(pokeapi, 'get')
      .mockResolvedValue({ data: expectedPokemonDetails })

    const pokemonDetailsService = new PokemonDetailsService()

    // Act
    const result = await pokemonDetailsService.findOne(name)

    // Assert
    expect(result).toBeInstanceOf(Right)
    expect(result.value).toEqual(expectedPokemonDetails)
    expect(pokeapi.get).toHaveBeenCalledWith(`${endpoints.pokemons}/${name}`)
  })

  // Tests that findOne method returns a Left Either object when an invalid name is passed
  it('should return a Left Either object when an invalid name is passed', async () => {
    // Arrange
    const name = 'invalidName'
    const expectedError = new Error('API failed with status: 500')
    jest
      .spyOn(pokeapi, 'get')
      .mockRejectedValueOnce({ response: { status: 500 } })

    const pokemonDetailsService = new PokemonDetailsService()

    // Act
    const result = await pokemonDetailsService.findOne(name)

    // Assert
    expect(result).toBeInstanceOf(Left)
    expect(result.value).toEqual(expectedError)
    expect(pokeapi.get).toHaveBeenCalledWith(`${endpoints.pokemons}/${name}`)
  })

  // Tests that findOne method handles and returns a Left Either object when the API returns an error response
  it('should handle and return a Left Either object when the API returns an error response', async () => {
    // Arrange
    const name = 'noValidPokemonName'
    const expectedError = new Error('API failed with status: 404')

    jest
      .spyOn(pokeapi, 'get')
      .mockRejectedValueOnce({ response: { status: 404 } })

    const pokemonDetailsService = new PokemonDetailsService()

    // Act
    const result = await pokemonDetailsService.findOne(name)

    // Assert
    expect(result).toBeInstanceOf(Left)
    expect(result.value).toEqual(expectedError)
    expect(pokeapi.get).toHaveBeenCalledWith(`${endpoints.pokemons}/${name}`)
  })

  //Test that save return same pokemon
  it('should save return the same pokemon', async () => {
    // Arrange
    const pokemon: PokemonDetailsDTODto = {
      name: 'pokemon',
      abilities: [],
      types: [],
      sprites: {} as SpritesDTO,
      id: 0,
    }
    const pokemonService = new PokemonDetailsService()
    // Act
    const savedPokemon = await pokemonService.save(pokemon)

    // Assert
    expect(savedPokemon).toEqual(pokemon)
  })
})
