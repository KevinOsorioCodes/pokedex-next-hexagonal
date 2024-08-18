import React, { useState } from 'react'
import {
  usePokedexDispatch,
  usePokedexState,
} from '~/infrastructure/react/hooks/usePokedexContext'
import { PokemonCard } from '~/infrastructure/react/ui/components/PokemonCard/PokemonCard'
import { PokedexActionType } from '~/infrastructure/react/reducers/pokedex.reducer'

function TeamFooter() {
  const [isOpen, setIsOpen] = useState(false)
  const { pokemonTeam } = usePokedexState()
  const dispatch = usePokedexDispatch()
  const clearTeam = () => {
    dispatch({ type: PokedexActionType.CLEAR_POKEMON_TEAM, payload: {} })
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-full left-0 transform ${
          isOpen ? '-translate-y-full' : 'translate-y-full'
        } transition-transform duration-300 ease-in-out bg-coolGray-400 w-full h-72 p-4 shadow-lg`}
      >
        <div className={'flex flex-row justify-between items-center'}>
          <h2 className="text-white text-xl font-bold">My Team</h2>
          <div className={'flex flex-row justify-end gap-3'}>
            <button
              className={
                'bg-gray-300 font-bold  rounded-xl px-2 hover:scale-105'
              }
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
            <button
              className={
                'bg-red-500 hover:bg-red-600 hover:scale-105 text-white font-bold  rounded-xl px-2'
              }
              onClick={clearTeam}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="flex  flex-row gap-8 items-center justify-center">
          {pokemonTeam.map((pokemon) => (
            <PokemonCard key={pokemon.id} name={pokemon.name} size={'small'} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="fixed right-0 top-20">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          {isOpen ? 'Hide Team' : 'Show Team'}
        </button>
      </div>
    </div>
  )
}

export default TeamFooter
