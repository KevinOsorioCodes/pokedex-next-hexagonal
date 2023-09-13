import { IPokemonListStorage } from '~/application/protocols/services'
import pokeapi from '~/infrastructure/services/pokeapi/pokeapi'
import endpoints from '~/infrastructure/services/pokeapi/endpoints'
import { IPokemonPaginated } from '~/infrastructure/services/pokeapi/entities/PokemonPaginated.entity'
import { left, right } from 'src/shared/either'

export class PokemonListService implements IPokemonListStorage {
  async getPaginated(limit = 40, offset = 0): IPokemonListStorage.output {
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
      .then((response) => {
        const pokemons = response.data.results.map((pokemon) => ({
          name: pokemon.name,
          url: pokemon.url,
        }))
        return right(pokemons)
      })
  }
}
