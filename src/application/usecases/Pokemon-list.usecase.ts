import { IPokemonListUseCase } from '~/domain/usecases/pokemon-list.usecase'
import { IPokemonListStorage } from '~/application/protocols/services'
import { left, right } from 'src/shared/either'

export class PokemonListUsecase implements IPokemonListUseCase {
  private readonly pokemonListStorage: IPokemonListStorage

  constructor(pokemonListStorage: IPokemonListStorage) {
    this.pokemonListStorage = pokemonListStorage
  }

  async getPaginatedPokemons(
    limit = 10,
    offset = 10
  ): IPokemonListUseCase.output {
    const result = await this.pokemonListStorage.getPaginated(limit, offset)
    if (result.isLeft()) {
      return left(new Error('Data Fetching failed!! Try refreshing the page.'))
    }

    return right(result.value)
  }
}
