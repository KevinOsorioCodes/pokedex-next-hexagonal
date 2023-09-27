import { IPokemonDetailsStorage } from '~/application/protocols/services'
import pokeapi from '~/infrastructure/services/pokeapi/pokeapi'
import endpoints from '~/infrastructure/services/pokeapi/endpoints'
import { Either, left, right } from '~/shared/either'
import { AxiosError, AxiosResponse } from 'axios'
import { PokemonDetailsDTODto } from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'

export class PokemonDetailsService implements IPokemonDetailsStorage {
  async findOne(name: string): IPokemonDetailsStorage.output {
    return await pokeapi
      .get<PokemonDetailsDTODto>(`${endpoints.pokemons}/${name}`)
      .then(
        (
          res: AxiosResponse<PokemonDetailsDTODto>
        ): Either<Error, PokemonDetailsDTODto> => {
          return right(res.data)
        }
      )
      .catch((e: AxiosError) =>
        left(new Error(`API failed with status: ${e.response?.status}`))
      )
  }

  async save(pokemon: PokemonDetailsDTODto) {
    return pokemon
  }
}
