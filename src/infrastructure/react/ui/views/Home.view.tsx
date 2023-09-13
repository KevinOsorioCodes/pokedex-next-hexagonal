import PokemonList from '~/infrastructure/react/ui/components/PokemonList'
import { FC } from 'react'
import { PokemonCard } from '~/infrastructure/react/ui/components/PokemonCard/PokemonCard'
import { PokemonDTO } from '~/infrastructure/services/pokeapi/entities/PokemonPaginated.entity'

export interface IHomeProps {
  pokemons: PokemonDTO[]
}

export const HomeView: FC<IHomeProps> = ({ pokemons }) => {
  return (
    <main className="flex h-screen flex-row items-start justify-between ">
      <PokemonList pokemons={pokemons} />
      <PokemonCard />
    </main>
  )
}
