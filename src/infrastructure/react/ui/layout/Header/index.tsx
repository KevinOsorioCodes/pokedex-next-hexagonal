import { labels } from '~/shared/labels'

const PokedexHeader = () => {
  return (
    <header
      className={'h-8 w-full bg-red-600 flex justify-center items-center'}
      aria-label={labels.APP_NAME}
    >
      {labels.APP_NAME}
    </header>
  )
}

export default PokedexHeader
