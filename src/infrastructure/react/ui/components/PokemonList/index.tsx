import { FC } from 'react'
import { labels } from '~/shared/labels'
import { usePokemonDetailsContext } from '~/infrastructure/react/hooks/usePokemonDetailsContext'
import { PokemonDTO } from '~/infrastructure/services/pokeapi/entities/PokemonPaginated.entity'

interface IPokemonListProps {
  pokemons?: PokemonDTO[]
}

const PokemonList: FC<IPokemonListProps> = ({ pokemons }) => {
  const { handleSelectPokemon } = usePokemonDetailsContext()
  return (
    <section className={'flex flex-col w-1/4 items-center gap-2'}>
      <h5 className={'font-bold text-xl'}>{labels.POKEDEX}</h5>
      {!pokemons && <div>loading...</div>}
      {pokemons && (
        <ol data-testid={'pokedex-list'}>
          {pokemons.map((pokemon, index) => (
            <li
              onClick={() => handleSelectPokemon(pokemon.name)}
              data-testid={`pokemon-${pokemon.name}`}
              key={`${pokemon.name}-${index}`}
            >
              {pokemon.name}
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default PokemonList
