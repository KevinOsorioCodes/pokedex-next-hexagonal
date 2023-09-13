import { render, screen } from '@testing-library/react'
import { labels } from '~/shared/labels/labels'
import { Pokemon } from '~/domain/entities/Pokemon.entity'
import PokemonList from '~/infrastructure/react/ui/components/PokemonList'

describe('Index Test Suite', () => {
  it('should return a section element with the text "PokemonListEntity"', () => {
    render(<PokemonList />)
    const sectionElement = screen.getByText(labels.POKEDEX)
    expect(sectionElement).toBeInTheDocument()
  })
  it('should return a list of pokemons when given a array of pokemons', () => {
    const pokemons: Pokemon[] = [
      { url: 'url1', name: 'pokemon1' },
      { url: 'url2', name: 'pokemon2' },
    ]
    render(<PokemonList pokemons={pokemons} />)
    const pokemon1 = screen.getByText('pokemon1')
    const pokemon2 = screen.getByText('pokemon1')
    expect(pokemon1).toBeInTheDocument()
    expect(pokemon2).toBeInTheDocument()
  })
  it('should show loading when not given an pokemon array', () => {
    render(<PokemonList />)
    const pokemon1 = screen.getByText('loading...')
    expect(pokemon1).toBeInTheDocument()
  })
})
