import { Either } from '~/shared/either'
import { PokemonDetails } from '~/domain/entities'

export interface IPokemonDetailsStorage {
  findOne: (name: string) => IPokemonDetailsStorage.output
  save: (pokemon: PokemonDetails) => Promise<PokemonDetails>
}

export namespace IPokemonDetailsStorage {
  export type output = Promise<Either<Error, PokemonDetails>>
}
