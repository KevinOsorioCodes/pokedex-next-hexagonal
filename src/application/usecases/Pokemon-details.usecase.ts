import { IPokemonDetailsUseCase } from '~/domain/usecases'
import { IPokemonDetailsStorage } from '~/application/protocols/services/pokemon-details'
import { left, right } from '~/shared/either'
import { PokemonDetails } from '~/domain/entities'

export class PokemonDetailsUsecase implements IPokemonDetailsUseCase {
  private readonly pokemonDetailsStorage: IPokemonDetailsStorage
  private readonly localPokemonDetailsStorage: IPokemonDetailsStorage

  constructor(
    pokemonDetailsStorage: IPokemonDetailsStorage,
    localPokemonDetailsStorage: IPokemonDetailsStorage
  ) {
    this.pokemonDetailsStorage = pokemonDetailsStorage
    this.localPokemonDetailsStorage = localPokemonDetailsStorage
  }

  async getPokemon(name: string): IPokemonDetailsUseCase.output {
    const localResult = await this.localPokemonDetailsStorage.findOne(name)
    if (localResult.isRight()) {
      return right(localResult.value)
    }
    const result = await this.pokemonDetailsStorage.findOne(name)
    if (result.isLeft()) {
      return left(new Error('Error Fetching data'))
    }
    await this.localPokemonDetailsStorage.save(result.value)
    return right(result.value)
  }

  savePokemon(pokemon: PokemonDetails) {
    return this.pokemonDetailsStorage.save(pokemon)
  }
}
