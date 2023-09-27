import { Either } from '~/shared/either'
import { PokemonDTO } from '~/infrastructure/services/dtos/PokemonPaginated.dto'

export interface IPokemonListStorage {
  getPaginated: (limit?: number, offset?: number) => IPokemonListStorage.output
}

export namespace IPokemonListStorage {
  export type output = Promise<Either<Error, PokemonDTO[]>>
}
