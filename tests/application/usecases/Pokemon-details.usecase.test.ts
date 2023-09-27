import { PokemonDetailsUsecase } from '~/application/usecases'
import { IPokemonDetailsStorage } from '~/application/protocols/services'
import { left, right } from '~/shared/either'
import {
  AbilityDTO,
  PokemonDetailsDTODto,
  SpritesDTO,
  TypeDTO,
} from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'

describe('PokemonDetailsUsecase', () => {
  const pokemonData: PokemonDetailsDTODto = {
    name: 'Pikachu',
    types: [] as TypeDTO[],
    abilities: [] as AbilityDTO[],
    sprites: {} as SpritesDTO,
    id: 1,
  }
  // Tests that the get method returns the correct PokemonDetails when given a valid name
  it('should return the correct PokemonDetails when given a valid name', async () => {
    // Arrange
    const name = 'Pikachu'
    const pokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(right(pokemonData)),
      save: jest.fn(),
    }
    const localPokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(right(pokemonData)),
      save: jest.fn().mockResolvedValue(pokemonData),
    }
    const usecase = new PokemonDetailsUsecase(
      pokemonDetailsStorageMock,
      localPokemonDetailsStorageMock
    )
    // Act
    const result = await usecase.getPokemon(name)

    // Assert
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(pokemonData)
  })
  // Tests that the save method returns the correct PokemonDetails when given a valid data
  it('should return the correct PokemonDetails when given a valid pokemon data', async () => {
    // Arrange
    const pokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn(),
      save: jest.fn().mockResolvedValue(pokemonData),
    }
    const localPokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn(),
      save: jest.fn().mockResolvedValue(pokemonData),
    }
    const usecase = new PokemonDetailsUsecase(
      pokemonDetailsStorageMock,
      localPokemonDetailsStorageMock
    )

    // Act
    const result = await usecase.savePokemon(pokemonData)

    // Assert
    expect(result).toEqual(pokemonData)
  })

  // Tests that the get method returns a Right Either object when given a valid name
  it('should return a Right Either object when given a valid name', async () => {
    // Arrange
    const name = 'Pikachu'
    const pokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(right(pokemonData)),
      save: jest.fn(),
    }
    const localPokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(right(pokemonData)),
      save: jest.fn().mockResolvedValue(pokemonData),
    }
    const usecase = new PokemonDetailsUsecase(
      pokemonDetailsStorageMock,
      localPokemonDetailsStorageMock
    )
    // Act
    const result = await usecase.getPokemon(name)

    // Assert
    expect(result.isRight()).toBe(true)
  })

  // Tests that the get method calls the findOne method of IPokemonDetailsStorage with the correct name
  it('should call the findOne method of IPokemonDetailsStorage with the correct name', async () => {
    // Arrange
    const name = 'Pikachu'
    const pokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(right(pokemonData)),
      save: jest.fn(),
    }
    const localPokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(right(pokemonData)),
      save: jest.fn().mockResolvedValue(pokemonData),
    }
    const usecase = new PokemonDetailsUsecase(
      pokemonDetailsStorageMock,
      localPokemonDetailsStorageMock
    )
    // Act
    await usecase.getPokemon(name)

    // Assert
    expect(localPokemonDetailsStorageMock.findOne).toHaveBeenCalledWith(name)
  })

  // Tests that the get method returns a Left Either object when IPokemonDetailsStorage returns an error
  it('should return a Left Either object when IPokemonDetailsStorage returns an error', async () => {
    // Arrange
    const name = 'Pikachu'
    const error = new Error('Error Fetching data')
    const pokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(left(error)),
      save: jest.fn(),
    }
    const localPokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(left(error)),
      save: jest.fn().mockResolvedValue(pokemonData),
    }
    const usecase = new PokemonDetailsUsecase(
      pokemonDetailsStorageMock,
      localPokemonDetailsStorageMock
    )
    // Act
    const result = await usecase.getPokemon(name)

    // Assert
    expect(result.isLeft()).toBe(true)
  })

  // Tests that the get method returns an Error object with the message 'Error Fetching data' when IPokemonDetailsStorage returns an error
  it('should return an Error object with the message "Error Fetching data" when IPokemonDetailsStorage returns an error', async () => {
    // Arrange
    const name = 'Pikachu'
    const error = new Error('Error Fetching data')
    const pokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(left(error)),
      save: jest.fn(),
    }
    const localPokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(left(error)),
      save: jest.fn().mockResolvedValue(pokemonData),
    }
    const usecase = new PokemonDetailsUsecase(
      pokemonDetailsStorageMock,
      localPokemonDetailsStorageMock
    )
    // Act
    const result = await usecase.getPokemon(name)

    // Assert
    expect(result.value).toEqual(error)
  })

  // Tests that the get method returns a Left Either object when given an invalid name
  it('should return a Left Either object when given an invalid name', async () => {
    // Arrange
    const name = 'InvalidPokemon'
    const pokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest
        .fn()
        .mockResolvedValue(left(new Error('Pokemon not found'))),
      save: jest.fn(),
    }
    const localPokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest
        .fn()
        .mockResolvedValue(left(new Error('Pokemon not found'))),
      save: jest.fn().mockResolvedValue(pokemonData),
    }
    const usecase = new PokemonDetailsUsecase(
      pokemonDetailsStorageMock,
      localPokemonDetailsStorageMock
    )
    // Act
    const result = await usecase.getPokemon(name)

    // Assert
    expect(result.isLeft()).toBe(true)
  })
})
