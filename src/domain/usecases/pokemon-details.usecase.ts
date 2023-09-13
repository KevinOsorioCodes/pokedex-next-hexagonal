import { Either } from 'src/shared/either'
import { PokemonDetails } from '~/domain/entities'

export interface IPokemonDetailsUseCase {
  getPokemon: (name: string) => IPokemonDetailsUseCase.output
}

export namespace IPokemonDetailsUseCase {
  export type output = Promise<Either<Error, PokemonDetails>>
}
