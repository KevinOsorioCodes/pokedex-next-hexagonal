import { renderHook, act } from '@testing-library/react'
import { usePokemon } from '~/infrastructure/react/hooks/usePokemon'
import pokeapi from '~/infrastructure/services/pokeapi/pokeapi'
import {
  AbilityDTO,
  TypeDTO,
} from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'

describe('usePokemon', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize pokemon on null', () => {
    // Arrange
    const { result } = renderHook(() => usePokemon())
    // Act & Assert
    expect(result.current.pokemon).toBe(null)
  })

  it('should refresh the pokemon state when call handleSelectPokemon', async () => {
    // Arrange
    const { result } = renderHook(() => usePokemon())

    const mockPokemonData = {
      id: 1,
      name: 'Pikachu',
      sprites: {},
      abilities: [] as AbilityDTO[],
      types: [] as TypeDTO[],
    }
    jest
      .spyOn(pokeapi, 'get')
      .mockResolvedValue({ data: mockPokemonData, status: 200 })
    // Act
    await act(async () => {
      result.current.handleSelectPokemon('Pikachu')
    })
    // Assert
    expect(result.current.pokemon).toEqual(mockPokemonData)
  })
  it('should refresh the pokemon state when call handleSelectPokemon', async () => {
    // Arrange
    const { result } = renderHook(() => usePokemon())

    jest.spyOn(pokeapi, 'get').mockRejectedValueOnce({ status: 404 })
    // Act
    await act(async () => {
      result.current.handleSelectPokemon('InvalidPokemon')
    })
    // Assert
    expect(result.current.pokemon).toEqual(null)
  })
})
