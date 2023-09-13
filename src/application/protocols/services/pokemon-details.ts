import { Either } from 'src/shared/either'
import { PokemonDetails } from '~/domain/entities'

export interface IPokemonDetailsStorage {
  findOne: (name: string) => IPokemonDetailsStorage.output
}

export namespace IPokemonDetailsStorage {
  export type output = Promise<Either<Error, PokemonDetails>>
}
