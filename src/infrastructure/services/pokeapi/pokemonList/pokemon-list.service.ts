import { IPokemonListStorage } from '~/application/protocols/services'
import pokeapi from '~/infrastructure/services/pokeapi/pokeapi'
import endpoints from '~/infrastructure/services/pokeapi/endpoints'
import {
  IPokemonPaginated,
  PokemonDTO,
} from '~/infrastructure/services/dtos/PokemonPaginated.dto'
import { Either, left, right } from '~/shared/either'
import { AxiosError } from 'axios'

export class PokemonListService implements IPokemonListStorage {
  async getPaginated(limit = 100, offset = 0): IPokemonListStorage.output {
    if (limit < 0) {
      return left(new Error(`Invalid limit parameter: ${limit}`))
    }
    if (offset < 0) {
      return left(new Error(`Invalid offset parameter: ${offset}`))
    }
    return await pokeapi
      .get<IPokemonPaginated>(endpoints.pokemons, {
        params: { limit, offset },
      })
      .then((response): Either<Error, PokemonDTO[]> => {
        const pokemons = response.data.results.map((pokemon) => ({
          name: pokemon.name,
          url: pokemon.url,
        }))
        return right(pokemons)
      })
      .catch((e: AxiosError) => {
        return left(new Error(`API failed with status: ${e?.response?.status}`))
      })
  }
}
