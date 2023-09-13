import { Either } from 'src/shared/either'
import { Pokemon } from '~/domain/entities'

export interface IPokemonListUseCase {
  getPaginatedPokemons: () => IPokemonListUseCase.output
}

export namespace IPokemonListUseCase {
  export type output = Promise<Either<Error, Pokemon[]>>
}
