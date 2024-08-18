import { useCallback, useState } from 'react'

interface IUsePokedexPaginationOutput {
  limit: number
  start: number
  handleNextPage: () => void
}

const POKEMONS_PER_PAGE = 20

export const usePokedexPagination = (): IUsePokedexPaginationOutput => {
  const [limit, setLimit] = useState(POKEMONS_PER_PAGE)
  const [start, setStart] = useState(0)

  const handleNextPage = useCallback(() => {
    setStart((prevState) => prevState + POKEMONS_PER_PAGE)
    setLimit((prevState) => prevState + POKEMONS_PER_PAGE)
  }, [])
  return { limit, start, handleNextPage }
}
