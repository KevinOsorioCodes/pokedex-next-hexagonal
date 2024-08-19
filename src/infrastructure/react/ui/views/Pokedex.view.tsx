import PokemonList from '~/infrastructure/react/ui/components/PokemonList'
import { useQuery } from '@tanstack/react-query'
import { POKEMON_LIST_KEY } from '~/infrastructure/services/query.keys'
import { pokemonList } from '~/infrastructure/services/pokemonQueries'
import { useEffect } from 'react'
import { usePokedexDispatch } from '~/infrastructure/react/hooks/usePokedexContext'
import { PokedexActionType } from '~/infrastructure/react/reducers/pokedex.reducer'

export const PokedexView = () => {
  const pokedexDispatch = usePokedexDispatch()
  const { data: pokemons } = useQuery({
    queryKey: [POKEMON_LIST_KEY],
    queryFn: pokemonList,
  })
  useEffect(() => {
    if (pokemons) {
      pokedexDispatch({
        type: PokedexActionType.ADD_LIST,
        payload: { pokemonList: pokemons },
      })
    }
  }, [pokedexDispatch, pokemons])
  return (
    <main className="flex flex-row items-start justify-between ">
      <PokemonList />
    </main>
  )
}
