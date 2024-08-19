import { Either } from '~/shared/either'
import { PokemonDTO } from '~/infrastructure/services/dtos/PokemonPaginated.dto'

export interface IPokemonListStorage {
  getPokemons: (limit?: number, offset?: number) => IPokemonListStorage.output
}

export namespace IPokemonListStorage {
  export type output = Promise<Either<Error, PokemonDTO[]>>
}
