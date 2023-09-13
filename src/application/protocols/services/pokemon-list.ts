import { Either } from 'src/shared/either'
import { Pokemon } from '~/domain/entities'

export interface IPokemonListStorage {
  getPaginated: (limit?: number, offset?: number) => IPokemonListStorage.output
}

export namespace IPokemonListStorage {
  export type output = Promise<Either<Error, Pokemon[]>>
}
