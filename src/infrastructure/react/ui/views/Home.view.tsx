import PokemonList from '~/infrastructure/react/ui/components/PokemonList'
import { FC } from 'react'
import { PokemonCard } from '~/infrastructure/react/ui/components/PokemonCard/PokemonCard'
import { PokemonDTO } from '~/infrastructure/services/dtos/PokemonPaginated.dto'

export interface IHomeProps {
  pokemons: PokemonDTO[]
}

export const HomeView: FC<IHomeProps> = ({ pokemons }) => {
  return (
    <main className="flex  overflow-hidden flex-row items-start justify-between ">
      <PokemonList pokemons={pokemons} />
      <PokemonCard />
    </main>
  )
}
