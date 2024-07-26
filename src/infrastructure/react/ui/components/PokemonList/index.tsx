import { FC, useEffect } from 'react'
import { labels } from '~/shared/labels'
import { usePokemonDetailsContext } from '~/infrastructure/react/hooks/usePokemonDetailsContext'
import { PokemonDTO } from '~/infrastructure/services/dtos/PokemonPaginated.dto'

interface IPokemonListProps {
  pokemons?: PokemonDTO[]
}

const PokemonList: FC<IPokemonListProps> = ({ pokemons }) => {
  const { handleSelectPokemon } = usePokemonDetailsContext()

  useEffect(() => {
    if (pokemons?.length) {
      handleSelectPokemon(pokemons[0].name)
    }
  }, [])
  return (
    <section
      className={
        'flex flex-col w-1/4 items-center gap-4 h-full overflow-y-scroll '
      }
    >
      <h5
        className={
          'font-bold text-xl fixed bg-black w-60 flex flex-col items-center justify-center h-10'
        }
      >
        {labels.POKEDEX}
      </h5>
      {!pokemons && <div>loading...</div>}
      {pokemons && (
        <ol
          data-testid={'pokedex-list'}
          className={
            'w-4/6 gap-2.5 flex flex-col items-center justify-center mt-10'
          }
        >
          {pokemons.map((pokemon, index) => (
            <li
              onClick={() => handleSelectPokemon(pokemon.name)}
              data-testid={`pokemon-${pokemon.name}`}
              key={`${pokemon.name}-${index}`}
              className={
                'cursor-pointer  w-full p-4 p border-2 flex flex-col items-center justify-center border-red-600'
              }
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
