import { HomeView, IHomeProps } from '~/infrastructure/react/ui/views/Home.view'
import { GetStaticProps, NextPage } from 'next'
import { PokemonListFactory } from '~/infrastructure/factories'

const Home: NextPage<IHomeProps> = ({ pokemons }) => {
  return <HomeView pokemons={pokemons} />
}
export const getStaticProps: GetStaticProps = async () => {
  const pokemonListFactory = PokemonListFactory()
  const result = await pokemonListFactory.getPaginatedPokemons()
  if (result.isLeft()) {
    return { notFound: true }
  }
  return {
    props: {
      pokemons: result.value,
    },
  }
}
export default Home
