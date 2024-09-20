import axios from 'axios'
import PokemonImage from '@/app/components/PokemonImage'
import { Pagination } from './components/Pagination'
import TypeSelector from './components/TypeSelector'

const getListPokemon = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

const Home = async ({ searchParams: { page, types } }: SearchParamProps) => {
  let dataSource = [] as any

  const typesData = await axios.get('https://pokeapi.co/api/v2/type')
  const typesDataSource = typesData.data.results
  const initialTypes = types ? (types as string).split(',') : []

  if (types) {
    const selectTypes = typesDataSource.filter((item: any) =>
      initialTypes.includes(item.name)
    )
    for (const type of selectTypes) {
      const resType = await axios.get(type.url)

      const pokemon = resType.data.pokemon.map((item: any) => {
        return {
          name: item.pokemon.name,
          url: item.pokemon.url,
        }
      })

      dataSource = [...dataSource, ...pokemon]
    }
  } else {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1200`
    const data = await getListPokemon(url)
    dataSource = data.results
  }

  const currentPage = Number(page as string) || 1
  const pageSize = 48
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = dataSource.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto px-4">
      <TypeSelector
        initialTypes={initialTypes}
        typesDataSource={typesDataSource}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-8">
        {paginatedData.map((item: any) => {
          return (
            <div key={item.name} className="flex flex-col items-center">
              <div className="w-24 h-24">
                <PokemonImage url={item.url} />
              </div>
              <div>{item.name}</div>
            </div>
          )
        })}
      </div>

      <Pagination
        page={currentPage}
        totalPages={Math.ceil(dataSource.length / pageSize)}
      />
    </div>
  )
}

export default Home
