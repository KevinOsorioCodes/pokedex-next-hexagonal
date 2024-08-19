import { FC } from 'react'

export const PokemonCardSkeleton: FC = () => {
  return (
    <div className="flex w-1/5 py-2 rounded-xl overflow-clip justify-center items-center bg-white shadow-md">
      <div className="flex flex-col justify-center items-center gap-2 w-full animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

        <div className="w-full flex justify-center">
          <div className="bg-gray-300  h-24 w-full"></div>
        </div>

        <div className="w-full flex flex-col px-4 gap-4">
          <div className="flex flex-row justify-center gap-4">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          </div>

          <div className="flex flex-row gap-2 flex-wrap items-center justify-center">
            <div className="flex w-16 flex-col items-center justify-center gap-2 border-2 rounded-full py-2">
              <div className={'h-3 bg-gray-300 w-1/2 '}></div>
              <div className={'h-3 bg-gray-300 w-1/2 '}></div>
            </div>
            <div className="flex w-16 flex-col items-center justify-center gap-2 border-2 rounded-full py-2">
              <div className={'h-3 bg-gray-300 w-1/2 '}></div>
              <div className={'h-3 bg-gray-300 w-1/2 '}></div>
            </div>
            <div className="flex w-16 flex-col items-center justify-center gap-2 border-2 rounded-full py-2">
              <div className={'h-3 bg-gray-300 w-1/2 '}></div>
              <div className={'h-3 bg-gray-300 w-1/2 '}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
