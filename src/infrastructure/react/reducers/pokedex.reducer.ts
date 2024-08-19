import { PokemonDetailsDTODto } from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'
import { PokemonDTO } from '~/infrastructure/services/dtos/PokemonPaginated.dto'

export interface Pokedex {
  [key: string]: PokemonDetailsDTODto
}

export interface PokedexState {
  pokedex: Pokedex
  pokemonList: PokemonDTO[]
  pokemonTeam: PokemonDetailsDTODto[]
}

export enum PokedexActionType {
  ADD_POKEMON = 'add_pokemon',
  ADD_POKEMON_PAGE = 'add_pokemon_page',
  ADD_LIST = 'add_lists',
  ADD_POKEMON_TEAM = 'add_pokemon_team',
  REMOVE_POKEMON_TEAM = 'remove_pokemon_team',
  CLEAR_POKEMON_TEAM = 'clear_pokemon_team',
}

export interface PokedexActionPayload {
  pokemon?: PokemonDetailsDTODto
  pokemonList?: PokemonDTO[]
  pokedex?: Pokedex
}

export interface PokedexAction {
  type: PokedexActionType
  payload: PokedexActionPayload
}

export const initialPokedex: PokedexState = {
  pokedex: {},
  pokemonList: [],
  pokemonTeam: [],
}

export const pokedexReducer = (
  state = initialPokedex,
  action: PokedexAction
): PokedexState => {
  if (action.payload.pokemon) {
    const pokemon = action.payload.pokemon

    switch (action.type) {
      case PokedexActionType.ADD_POKEMON: {
        return {
          ...state,
          pokedex: {
            ...state.pokedex,
            [pokemon.name]: pokemon,
          },
        }
      }
      case PokedexActionType.ADD_POKEMON_TEAM: {
        return { ...state, pokemonTeam: [...state.pokemonTeam, pokemon] }
      }
      case PokedexActionType.REMOVE_POKEMON_TEAM: {
        const teamFiltered = state.pokemonTeam.filter(
          (element) => element.id !== pokemon.id
        )
        return { ...state, pokemonTeam: teamFiltered }
      }
    }
  }
  if (
    action.payload.pokemonList &&
    action.type === PokedexActionType.ADD_LIST
  ) {
    return { ...state, pokemonList: action.payload.pokemonList }
  }

  if (action.type === PokedexActionType.ADD_POKEMON_PAGE) {
    return {
      ...state,
      pokedex: { ...state.pokedex, ...action.payload.pokedex },
    }
  }
  if (action.type === PokedexActionType.CLEAR_POKEMON_TEAM) {
    return { ...state, pokemonTeam: [] }
  }
  return state
}
