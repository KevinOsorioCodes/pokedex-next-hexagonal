import { IPokemonListUseCase } from '~/domain/usecases/pokemon-list.usecase'
import { IPokemonListStorage } from '~/application/protocols/services'

export class PokemonListUsecase implements IPokemonListUseCase {
  private readonly pokemonListStorage: IPokemonListStorage

  constructor(pokemonListStorage: IPokemonListStorage) {
    this.pokemonListStorage = pokemonListStorage
  }

  async getPokemonList(limit = 1038, offset = 0): IPokemonListUseCase.output {
    const result = await this.pokemonListStorage.getPokemons(limit, offset)
    if (result.isLeft()) {
      throw new Error('Error Fetching data')
    }
    return result.value
  }
}
