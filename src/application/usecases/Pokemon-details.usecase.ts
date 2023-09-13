import { IPokemonDetailsUseCase } from '~/domain/usecases'
import { IPokemonDetailsStorage } from '~/application/protocols/services/pokemon-details'
import { left, right } from 'src/shared/either'

export class PokemonDetailsUsecase implements IPokemonDetailsUseCase {
  private readonly pokemonDetailsStorage: IPokemonDetailsStorage

  constructor(pokemonDetailsStorage: IPokemonDetailsStorage) {
    this.pokemonDetailsStorage = pokemonDetailsStorage
  }

  async getPokemon(name: string): IPokemonDetailsUseCase.output {
    const result = await this.pokemonDetailsStorage.findOne(name)
    if (result.isLeft()) {
      return left(new Error('Error Fetching data'))
    }
    return right(result.value)
  }
}
