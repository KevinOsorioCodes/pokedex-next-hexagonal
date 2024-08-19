import { FC } from 'react'

export interface IPokemonStatProps {
  name: string
  stat: number
  small?: boolean
}

export const PokemonStat: FC<IPokemonStatProps> = ({ stat, name, small }) => {
  return (
    <div
      key={name}
      className={`flex ${
        small ? 'w-8' : 'w-12'
      } flex-col items-center justify-center border-2 rounded-full`}
    >
      <div>
        {name.split('-')[0].slice(0, 3)}
        {name.split('-')[1]?.slice(0, 3).padStart(4, '.') || ''}
      </div>
      <div>{stat}</div>
    </div>
  )
}
