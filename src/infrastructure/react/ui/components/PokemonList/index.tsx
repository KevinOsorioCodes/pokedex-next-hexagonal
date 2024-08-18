import { FC } from 'react'
import { usePokedexState } from '~/infrastructure/react/hooks/usePokedexContext'
import { PokemonCard } from '~/infrastructure/react/ui/components/PokemonCard/PokemonCard'
import { Pokeball } from '~/infrastructure/react/ui/components/Pokeball'
import { usePokedexPagination } from '~/infrastructure/react/hooks/usePokedexPagination'
import { usePokemonSearch } from '~/infrastructure/react/hooks/usePokemonSearch'

interface IPokemonListProps {}

const PokemonList: FC<IPokemonListProps> = () => {
  const state = usePokedexState()
  const { limit, handleNextPage } = usePokedexPagination()
  const { searchTerm, handleChange, filteredPokedex } = usePokemonSearch()
  return (
    <section
      data-testid={'pokemon-list'}
      className={'flex  flex-col w-full items-center gap-4 mt-3 h-full mb-60 '}
    >
      <input
        data-testid={'search-bar'}
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Find your pokemon..."
        className="w-full max-w-md py-2 px-4 bg-gray-100 rounded-full shadow-lg text-gray-700 placeholder-gray-400 outline-none border-2 border-transparent focus:border-blue-500 transition-colors duration-300"
      />
      <div
        className={
          'flex flex-row w-full items-center justify-center flex-wrap gap-6 h-full '
        }
      >
        {!searchTerm &&
          state.pokemonList
            .slice(0, limit)
            .map((pokemon) => (
              <PokemonCard name={pokemon.name} key={pokemon.name} />
            ))}
        {searchTerm &&
          filteredPokedex.map((element) => (
            <PokemonCard key={element.name} name={element.name} />
          ))}
      </div>
      {!searchTerm && (
        <button
          onClick={handleNextPage}
          className="bg-yellow-400  gap-2 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex items-center transition-transform duration-300 transform hover:scale-105"
        >
          <Pokeball width={25} height={25} />

          <span>Show more</span>
        </button>
      )}
    </section>
  )
}

export default PokemonList
