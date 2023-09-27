import { usePokemonDetailsContext } from '~/infrastructure/react/hooks/usePokemonDetailsContext'
import Image from 'next/image'

export const PokemonCard = () => {
  const { pokemon } = usePokemonDetailsContext()

  return (
    <div className="w-full h-full flex justify-center items-center">
      {pokemon && (
        <div
          className={
            'w-1/4 bg-gray-950 flex flex-col h-96 justify-center items-center'
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
          <div className={'w-full flex flex-col px-4 gap-4'}>
            <div className={'w-full flex flex-row justify-around'}>
              <h5 className={'font-bold text-xl'}>Types:</h5>
              <div className={'w-full flex flex-col '}>
                {pokemon.types.map((el) => (
                  <p key={el.type.name} className={'text-sm'}>
                    - {el.type.name}
                  </p>
                ))}
              </div>
            </div>
            <div className={'w-full flex flex-row gap-7'}>
              <h5 className={'font-bold text-xl'}>Abilities:</h5>
              <div className={'w-full flex flex-col text-sm'}>
                {pokemon.abilities.map((el) => (
                  <p key={el.ability.name}>- {el.ability.name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
