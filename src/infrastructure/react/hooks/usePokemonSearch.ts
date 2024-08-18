import { ChangeEvent, useEffect, useState } from 'react'
import {
  Pokedex,
  PokedexActionType,
} from '~/infrastructure/react/reducers/pokedex.reducer'
import { pokemonDetailsFactory } from '~/infrastructure/factories/pokemonDetails/pokemonDetails.factory'
import { PokemonDetailsDTODto } from '~/infrastructure/services/dtos/PokemonDetailsDTO.dto'
import {
  usePokedexDispatch,
  usePokedexState,
} from '~/infrastructure/react/hooks/usePokedexContext'

interface IUsePokemonSearchOutput {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  filteredPokedex: PokemonDetailsDTODto[]
  searchTerm: string
}

export const usePokemonSearch = (): IUsePokemonSearchOutput => {
  const { pokemonList } = usePokedexState()

  const dispatch = usePokedexDispatch()
  const { pokedex } = usePokedexState()
  const [filteredPokedex, setFilteredPokedex] = useState<
    PokemonDetailsDTODto[]
  >([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  const handleSearch = async () => {
    const text = searchTerm
    if (text === '') {
      setFilteredPokedex([])
      return
    }
    const pokemonsToFind = pokemonList.filter((item) =>
      item.name.includes(text)
    )
    const newFilteredPokemon = []
    const pokemonToAdd: Pokedex = {}
    const pokemonDetailUseCase = pokemonDetailsFactory()
    for (const pokemonDTO of pokemonsToFind) {
      const pokemon = pokedex[pokemonDTO.name]
      if (!pokemon) {
        const result = await pokemonDetailUseCase.getPokemon(pokemonDTO.name)
        if (result.isRight()) {
          pokemonToAdd[result.value.name] = result.value
          newFilteredPokemon.push(result.value)
        }
      } else {
        newFilteredPokemon.push(pokemon)
      }
    }

    dispatch({
      type: PokedexActionType.ADD_POKEMON_PAGE,
      payload: { pokedex: pokemonToAdd },
    })
    setFilteredPokedex(newFilteredPokemon)
  }
  useEffect(() => {
    const searchTimeOut = setTimeout(async () => {
      await handleSearch()
    }, 500)
    return () => {
      clearTimeout(searchTimeOut)
    }
  }, [searchTerm])
  return { handleChange, searchTerm, filteredPokedex }
}
