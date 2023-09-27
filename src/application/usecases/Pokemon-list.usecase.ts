import { IPokemonListUseCase } from '~/domain/usecases/pokemon-list.usecase'
import { IPokemonListStorage } from '~/application/protocols/services'
import { left, right } from '~/shared/either'

export class PokemonListUsecase implements IPokemonListUseCase {
  private readonly pokemonListStorage: IPokemonListStorage

  constructor(pokemonListStorage: IPokemonListStorage) {
    this.pokemonListStorage = pokemonListStorage
  }

  async getPaginatedPokemons(
    limit = 100,
    offset = 0
  ): IPokemonListUseCase.output {
    const result = await this.pokemonListStorage.getPaginated(limit, offset)
    if (result.isLeft()) {
      return left(new Error('Data Fetching failed!! Try refreshing the page.'))
    }

    return right(result.value)
  }
}
