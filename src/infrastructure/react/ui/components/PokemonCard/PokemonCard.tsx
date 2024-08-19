import Image from 'next/image'
import {
  pokemonColors,
  PokemonType,
  usePokemonColor,
} from '~/infrastructure/react/hooks/usePokemonColor'
import { FC } from 'react'
import { PokemonStats } from '~/infrastructure/react/ui/components/PokemonCard/PokemonStats'
import {
  usePokedexDispatch,
  usePokedexState,
} from '~/infrastructure/react/hooks/usePokedexContext'
import { useQuery } from '@tanstack/react-query'
import { PokemonCardSkeleton } from '~/infrastructure/react/ui/components/PokemonCard/PokemonCardSkeleton'
import { getPokemon } from '~/infrastructure/services/pokemonQueries'
import { PokedexActionType } from '~/infrastructure/react/reducers/pokedex.reducer'

interface IPokemonCardProps {
  name: string
  size?: 'normal' | 'small'
}

export const PokemonCard: FC<IPokemonCardProps> = ({
  name,
  size = 'normal',
}) => {
  const { pokedex, pokemonTeam } = usePokedexState()
  const dispatch = usePokedexDispatch()
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: async () => {
      const data = await getPokemon(pokedex, name)
      if (data) {
        dispatch({
          type: PokedexActionType.ADD_POKEMON,
          payload: { pokemon: data },
        })
      }
      return data
    },
    initialData: pokedex[name],
    staleTime: 60 * 1000,
  })
  const color = usePokemonColor({ types: pokemon?.types })
  const handleAddPokemon = () => {
    dispatch({ type: PokedexActionType.ADD_POKEMON_TEAM, payload: { pokemon } })
  }
  const handleRemovePokemon = () => {
    dispatch({
      type: PokedexActionType.REMOVE_POKEMON_TEAM,
      payload: { pokemon },
    })
  }
  if (isLoading) {
    return <PokemonCardSkeleton />
  }
  const actuallyOnTeam = pokemonTeam.includes(pokemon)
  const isDisabled = pokemonTeam.length === 6 && !actuallyOnTeam
  return (
    <div
      className={`flex min-w-fit ${
        size === 'normal' ? 'max-w-3xl w-1/6' : 'w-14 h-56'
      }   py-2 rounded-xl overflow-clip  justify-center items-center bg-white shadow-xl transform transition-transform duration-300 hover:scale-110 `}
    >
      {pokemon && color && (
        <div
          className={`flex flex-col w-full justify-center items-center gap-2`}
          data-testid={`pokemon-${pokemon.id}`}
        >
          <div
            className={'flex flex-row justify-center items-center gap-2 w-full'}
          >
            <h2
              className={'font-bold text-xl'}
              data-testid={`title-${pokemon.name}`}
            >
              {pokemon.name}
            </h2>
            <p>{pokemon.id}</p>
          </div>
          <div className={` flex ${color} w-full items-center justify-center`}>
            <Image
              src={pokemon.sprites.front_default || ''}
              width={size === 'normal' ? 120 : 60}
              height={size === 'normal' ? 120 : 60}
              alt={`${pokemon.name}-image`}
            />
          </div>
          <div className={' flex flex-col px-4 gap-4'}>
            <div className={' flex flex-row justify-center items-center gap-4'}>
              {pokemon.types.map((el) => (
                <p
                  key={el.type.name}
                  className={`bg-${
                    pokemonColors[el.type.name as PokemonType]
                  } rounded-xl pt-0 px-2 text-sm text-amber-50 font-bold`}
                >
                  {el.type.name}
                </p>
              ))}
            </div>
            <PokemonStats stats={pokemon.stats} small={size === 'small'} />
          </div>
          <button
            className={`flex items-center w-30 text-xs font-bold py-2 px-4 rounded-full shadow-lg transition-transform transform ${
              isDisabled
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
            }`}
            disabled={isDisabled}
            onClick={actuallyOnTeam ? handleRemovePokemon : handleAddPokemon}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  pokemonTeam.includes(pokemon) ? 'M20 12H4' : 'M12 4v16m8-8H4'
                }
              />
            </svg>
            {pokemonTeam.includes(pokemon) ? 'Remove' : 'Add to Team'}
          </button>
        </div>
      )}
    </div>
  )
}
