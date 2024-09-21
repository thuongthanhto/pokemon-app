import axios from 'axios'
import PokemonImage from '@/app/components/PokemonImage'
import { Pagination } from './components/Pagination'
import TypeSelector from './components/TypeSelector'

// Fetch the list of all Pokémon
const getListPokemon = async (): Promise<PokemonListResponse> => {
  try {
    const response = await axios.get<PokemonListResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1302'
    )
    return response.data
  } catch (error) {
    console.error('Error fetching Pokémon list:', error)
    throw new Error('Failed to fetch Pokémon list.')
  }
}

// Fetch the list of all Pokémon types
const getTypes = async (): Promise<TypeListResponse> => {
  try {
    const response = await axios.get<TypeListResponse>(
      'https://pokeapi.co/api/v2/type'
    )
    return response.data
  } catch (error) {
    console.error('Error fetching types:', error)
    throw new Error('Failed to fetch types.')
  }
}

const Home = async ({ searchParams: { page, types } }: SearchParamProps) => {
  let dataSource: NamedAPIResource[] = []

  try {
    const typesData = await getTypes()
    const typesDataSource = typesData.results
    const initialTypes = types ? (types as string).split(',') : []

    if (types) {
      const selectedTypes = typesDataSource.filter((item) =>
        initialTypes.includes(item.name)
      )

      for (const type of selectedTypes) {
        try {
          const resType = await axios.get<TypeResponse>(type.url)
          const pokemon = resType.data.pokemon.map((item) => ({
            name: item.pokemon.name,
            url: item.pokemon.url,
          }))
          dataSource = [...dataSource, ...pokemon]
        } catch (error) {
          console.error(`Error fetching Pokémon for type ${type.name}:`, error)
          throw new Error(`Failed to fetch Pokémon for type ${type.name}.`)
        }
      }
    } else {
      const data = await getListPokemon()
      dataSource = data.results
    }

    // Pagination logic
    const currentPage = Number(page) || 1
    const pageSize = 40
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedData = dataSource.slice(startIndex, endIndex)

    return (
      <div className="container mx-auto mt-3 mb-2">
        <TypeSelector
          initialTypes={initialTypes}
          typesDataSource={typesDataSource}
        />

        <div className="my-12 mx-4 font-bold">
          {dataSource.length} results found.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-8">
          {paginatedData.map((item) => (
            <div key={item.name} className="flex flex-col items-center">
              <div className="w-24 h-24">
                <PokemonImage url={item.url} />
              </div>
              <div>{item.name}</div>
            </div>
          ))}
        </div>

        <Pagination
          page={currentPage}
          totalPages={Math.ceil(dataSource.length / pageSize)}
        />
      </div>
    )
  } catch (error: unknown) {
    console.error('Error in Home component:', error)
    let errorMessage = 'An unexpected error occurred.'
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.statusText
    } else if (error instanceof Error) {
      errorMessage = error.message
    }

    return (
      <div className="container mx-auto mt-3 mb-2">
        <p>Error: {errorMessage}</p>
      </div>
    )
  }
}

export default Home
