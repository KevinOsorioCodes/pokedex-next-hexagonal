import { GetStaticProps, NextPage } from 'next'
import { PokedexView } from '~/infrastructure/react/ui/views/Pokedex.view'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { POKEMON_LIST_KEY } from '~/infrastructure/services/query.keys'
import { PokemonDTO } from '~/infrastructure/services/dtos/PokemonPaginated.dto'
import { pokemonList } from '~/infrastructure/services/pokemonQueries'

interface IPokemonsProps {
  pokemons: PokemonDTO[]
}

const Pokemons: NextPage<IPokemonsProps> = ({ pokemons }) => {
  return (
    <HydrationBoundary state={pokemons}>
      <PokedexView />
    </HydrationBoundary>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
  await queryClient.prefetchQuery({
    queryKey: [POKEMON_LIST_KEY],
    queryFn: pokemonList,
  })

  return {
    props: {
      pokemons: dehydrate(queryClient),
    },
  }
}

export default Pokemons
