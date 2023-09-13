import { IPokemonDetailsStorage } from '~/application/protocols/services'
import pokeapi from '~/infrastructure/services/pokeapi/pokeapi'
import endpoints from '~/infrastructure/services/pokeapi/endpoints'
import { Either, left, right } from 'src/shared/either'
import { AxiosResponse } from 'axios'
import { AxiosError } from 'axios'

export interface SpritesDTO {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
}

export interface PokemonDetailsDTO {
  id: number
  name: string
  sprites: SpritesDTO
}

export class PokemonDetailsService implements IPokemonDetailsStorage {
  async findOne(name: string) {
    return await pokeapi
      .get<PokemonDetailsDTO>(`${endpoints.pokemons}/${name}`)
      .then(
        (
          res: AxiosResponse<PokemonDetailsDTO>
        ): Either<Error, PokemonDetailsDTO> => right(res.data)
      )
      .catch((e: AxiosError): Either<Error, PokemonDetailsDTO> => {
        return left(new Error(`API failed with status: ${e.response?.status}`))
      })
  }
}
