import { useMemo } from 'react'
import { TypeDTO } from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'

const pokemonTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const

export type PokemonType = (typeof pokemonTypes)[number]

type PokemonColors = {
  [key in PokemonType]: string
}

export const pokemonColors: PokemonColors = {
  normal: 'gray-400',
  fire: 'red-500',
  water: 'blue-500',
  electric: 'yellow-400',
  grass: 'green-500',
  ice: 'blue-300',
  fighting: 'red-700',
  poison: 'purple-500',
  ground: 'yellow-700',
  flying: 'indigo-400',
  psychic: 'pink-500',
  bug: 'green-700',
  rock: 'yellow-800',
  ghost: 'purple-800',
  dragon: 'indigo-700',
  dark: 'gray-800',
  steel: 'gray-600',
  fairy: 'pink-300',
}

interface IUsePokemonColorInput {
  types?: TypeDTO[]
}

export const usePokemonColor = ({ types }: IUsePokemonColorInput): string => {
  return useMemo(() => {
    if (types) {
      if (types.length === 1) {
        return `bg-${pokemonColors[types[0].type.name as PokemonType]}`
      } else if (types.length > 1) {
        const gradientColors = types.map(
          (type) => pokemonColors[type.type.name as PokemonType]
        )
        return `bg-gradient-to-br from-${gradientColors[0]} to-${
          gradientColors[gradientColors.length - 1]
        }`
      }
    }
    return ''
  }, [types])
}
