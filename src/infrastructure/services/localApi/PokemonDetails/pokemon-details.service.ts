import { Either, left, right } from '~/shared/either'
import { PokemonDetailsDTODto } from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'
import { LocalPokemonsDto } from '~/infrastructure/services/dtos/LocalPokemons.dto'
import { IPokemonDetailsStorage } from '~/application/protocols/services'

export class PokemonDetailsService implements IPokemonDetailsStorage {
  async getPokemons(): Promise<Either<Error, LocalPokemonsDto>> {
    const localData = localStorage.getItem('pokemons')
    if (!localData) {
      return left(new Error('There are no saved pokemons'))
    }
    const localJson: LocalPokemonsDto = await JSON.parse(localData)
    return right(localJson)
  }

  async findOne(name: string): Promise<Either<Error, PokemonDetailsDTODto>> {
    const pokemons = await this.getPokemons()
    if (pokemons.isLeft()) {
      return left(new Error('something wrong'))
    }
    if (pokemons.value[name]) {
      return right(pokemons.value[name])
    }
    return left(new Error(`Pokemon ${name} not Found`))
  }

  async save(pokemon: PokemonDetailsDTODto) {
    const pokemons = await this.getPokemons()
    const newPokemon = { [pokemon.name]: pokemon }
    if (pokemons.isLeft()) {
      localStorage.setItem('pokemons', JSON.stringify({ ...newPokemon }))
    }
    const newPokemons = { ...pokemons.value, ...newPokemon }
    localStorage.setItem('pokemons', JSON.stringify({ ...newPokemons }))
    return pokemon
  }
}
