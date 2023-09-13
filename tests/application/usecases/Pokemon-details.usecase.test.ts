import { PokemonDetailsUsecase } from '~/application/usecases'
import { IPokemonDetailsStorage } from '~/application/protocols/services'
import { left, right } from 'src/shared/either'

describe('PokemonDetailsUsecase', () => {
  // Tests that the get method returns the correct PokemonDetails when given a valid name
  it('should return the correct PokemonDetails when given a valid name', async () => {
    // Arrange
    const name = 'Pikachu'
    const pokemonDetails = { name: 'Pikachu', type: 'Electric' }
    const pokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(right(pokemonDetails)),
    }
    const usecase = new PokemonDetailsUsecase(pokemonDetailsStorageMock)

    // Act
    const result = await usecase.getPokemon(name)

    // Assert
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual(pokemonDetails)
  })

  // Tests that the get method returns a Right Either object when given a valid name
  it('should return a Right Either object when given a valid name', async () => {
    // Arrange
    const name = 'Pikachu'
    const pokemonDetails = { name: 'Pikachu', type: 'Electric' }
    const pokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(right(pokemonDetails)),
    }
    const usecase = new PokemonDetailsUsecase(pokemonDetailsStorageMock)

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
      findOne: jest.fn().mockResolvedValue(right({})),
    }
    const usecase = new PokemonDetailsUsecase(pokemonDetailsStorageMock)

    // Act
    await usecase.getPokemon(name)

    // Assert
    expect(pokemonDetailsStorageMock.findOne).toHaveBeenCalledWith(name)
  })

  // Tests that the get method returns a Left Either object when IPokemonDetailsStorage returns an error
  it('should return a Left Either object when IPokemonDetailsStorage returns an error', async () => {
    // Arrange
    const name = 'Pikachu'
    const error = new Error('Error Fetching data')
    const pokemonDetailsStorageMock: IPokemonDetailsStorage = {
      findOne: jest.fn().mockResolvedValue(left(error)),
    }
    const usecase = new PokemonDetailsUsecase(pokemonDetailsStorageMock)

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
    }
    const usecase = new PokemonDetailsUsecase(pokemonDetailsStorageMock)

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
    }
    const usecase = new PokemonDetailsUsecase(pokemonDetailsStorageMock)

    // Act
    const result = await usecase.getPokemon(name)

    // Assert
    expect(result.isLeft()).toBe(true)
  })
})
