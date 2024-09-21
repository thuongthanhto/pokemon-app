declare type SearchParamProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

declare interface PaginationProps {
  page: number
  totalPages: number
}

declare interface NamedAPIResource {
  name: string
  url: string
}

declare interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

declare interface TypeListResponse {
  count: number
  next: string | null
  previous: string | null
  results: NamedAPIResource[]
}

declare interface TypeResponse {
  id: number
  name: string
  pokemon: PokemonTypeEntry[]
}

declare interface PokemonTypeEntry {
  slot: number
  pokemon: NamedAPIResource
}

declare interface SearchParamProps {
  searchParams: {
    page?: string
    types?: string
  }
}
