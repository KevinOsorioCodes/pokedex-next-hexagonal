import { labels } from '~/shared/labels'
import Image from 'next/image'
import Logo from '~/shared/assets/logo.png'
import { FC } from 'react'
import { useRouter } from 'next/router'

interface IMenuItem {
  label: string
  page: string
}

interface IMenuItemProps {
  item: IMenuItem
}

const MenuItem: FC<IMenuItemProps> = ({ item: { page, label } }) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(page)
  }
  return (
    <button
      data-testid={`item-${label}`}
      key={page}
      className={'flex flex-col justify-center items-center cursor-pointer'}
      onClick={handleClick}
    >
      <h5 className={'text-paragraph text-lg'}>{label}</h5>
      {router.route === page && (
        <div className={'h-0 w-full border-b-2 rounded-3xl border-paragraph'} />
      )}
    </button>
  )
}

export enum Routes {
  HOME = '/',
  POKEDEX = '/pokedex',
}

const menu: IMenuItem[] = [
  { label: labels.routes.home, page: Routes.HOME },
  { label: labels.routes.pokedex, page: Routes.POKEDEX },
]

const PokedexHeader = () => {
  return (
    <div
      className={
        'h-16 w-full fixed z-20 bg-third drop-shadow-md flex justify-center items-center gap-48'
      }
      aria-label={labels.APP_NAME}
      data-testid={'header'}
    >
      <Image
        src={Logo}
        alt={'logo'}
        data-testid={'logo'}
        width={157}
        height={63}
      />
      <div className={'flex flex-row gap-6'}>
        {menu.map((element) => (
          <MenuItem item={element} key={element.page} />
        ))}
      </div>
    </div>
  )
}
export default PokedexHeader
