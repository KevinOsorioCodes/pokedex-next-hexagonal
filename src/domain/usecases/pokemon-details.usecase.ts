import { Either } from '~/shared/either'
import { PokemonDetails } from '~/domain/entities'

export interface IPokemonDetailsUseCase {
  getPokemon: (name: string) => IPokemonDetailsUseCase.output
  savePokemon: (pokemon: PokemonDetails) => void
}

export namespace IPokemonDetailsUseCase {
  export type output = Promise<Either<Error, PokemonDetails>>
}
