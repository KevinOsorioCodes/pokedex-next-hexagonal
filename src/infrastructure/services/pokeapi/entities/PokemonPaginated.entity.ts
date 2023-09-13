export interface PokemonDTO {
  name: string
  url: string
}

export interface IPokemonPaginated {
  count: number
  next: string | null
  previous: string | null
  results: PokemonDTO[]
}
