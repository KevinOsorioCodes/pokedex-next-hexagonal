import { usePokemonDetailsContext } from '~/infrastructure/react/hooks/usePokemonDetailsContext'
import Image from 'next/image'

export const PokemonCard = () => {
  const { pokemon } = usePokemonDetailsContext()

  return (
    <div className="w-full h-full flex justify-center items-center">
      {pokemon && (
        <div
          className={
            'w-1/3 bg-gray-950 flex flex-col h-96 justify-center items-center'
          }
          data-testid={`pokemon-${pokemon?.id}`}
        >
          <h2
            className={'font-bold text-xl'}
            data-testid={`title-${pokemon?.name}`}
          >
            {pokemon.name}
          </h2>
          <Image
            src={pokemon.sprites.front_default}
            width={150}
            height={150}
            alt={`${pokemon.name}-image`}
          />
        </div>
      )}
    </div>
  )
}
