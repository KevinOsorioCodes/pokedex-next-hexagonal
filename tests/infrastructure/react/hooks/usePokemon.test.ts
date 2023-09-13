import { renderHook, act } from '@testing-library/react'
import { usePokemon } from '~/infrastructure/react/hooks/usePokemon'
import { PokemonDetails, Sprites } from '~/domain/entities'

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

    const mockPokemonData: PokemonDetails = {
      id: 1,
      name: 'Pikachu',
      sprites: {} as Sprites,
    }
    // Act
    await act(async () => {
      result.current.handleSelectPokemon('Pikachu')
    })
    // Assert
    expect(result.current.pokemon).toEqual(mockPokemonData)
  })
})
