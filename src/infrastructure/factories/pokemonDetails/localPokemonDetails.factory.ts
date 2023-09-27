import { PokemonDetailsService } from '~/infrastructure/services/localApi/PokemonDetails/pokemon-details.service'
import { PokemonDetailsUsecase } from '~/application/usecases'

export const LocalPokemonDetailsFactory = () => {
  const storage = new PokemonDetailsService()
  return new PokemonDetailsUsecase(storage)
}
