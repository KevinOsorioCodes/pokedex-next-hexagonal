import { StatDTO } from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'
import { FC } from 'react'
import { PokemonStat } from '~/infrastructure/react/ui/components/PokemonCard/PokemonStat'

export interface IPokemonStatsProps {
  stats: StatDTO[]
  extended?: boolean
  small?: boolean
}

export const PokemonStats: FC<IPokemonStatsProps> = ({
  stats,
  extended = false,
  small,
}) => {
  const showedStats = extended ? stats : stats.slice(0, 3)
  return (
    <div
      className={
        ' flex flex-row w-24 text-sm flex-wrap justify-center items-center'
      }
    >
      {showedStats.map((element) => (
        <PokemonStat
          key={element.stat.name}
          name={element.stat.name}
          stat={element.base_stat}
          small={small}
        />
      ))}
    </div>
  )
}
