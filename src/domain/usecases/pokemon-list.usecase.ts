import { Pokemon } from '~/domain/entities'

export interface IPokemonListUseCase {
  getPokemonList: () => IPokemonListUseCase.output
}

export namespace IPokemonListUseCase {
  export type output = Promise<Pokemon[]>
}
