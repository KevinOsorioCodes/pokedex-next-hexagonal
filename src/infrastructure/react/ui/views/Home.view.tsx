import { FC, useCallback } from 'react'
import { PokemonDTO } from '~/infrastructure/services/dtos/PokemonPaginated.dto'
import { labels } from '~/shared/labels'
import Banner from '~/shared/assets/banner.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Routes } from '~/infrastructure/react/ui/layout'

export interface IHomeProps {
  pokemons: PokemonDTO[]
}

export const HomeView: FC = () => {
  const router = useRouter()
  const handleGoPokedex = useCallback(() => {
    router.push(Routes.POKEDEX)
  }, [router])

  return (
    <main className="flex   flex-row items-start justify-between ">
      <section
        className={
          'w-7/12 pl-9 pt-20 flex flex-col items-start justify-start gap-6'
        }
      >
        <h1 className={'text-6xl'}>
          <b> {labels.home.find}</b> {labels.home.allFavorites}{' '}
          <b>{labels.home.pokemon}</b>
        </h1>
        <h2 className={'text-3xl'}>{labels.home.subtitle}</h2>
        <button
          onClick={handleGoPokedex}
          className={'bg-primaryButton p-2 rounded-xl drop-shadow-lg'}
        >
          {labels.home.button}
        </button>
      </section>
      <section>
        <Image src={Banner} alt={'pikachu banner'} width={650} height={650} />
      </section>
    </main>
  )
}
