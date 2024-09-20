'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type TypeSelectorProps = {
  initialTypes?: string[]
  typesDataSource: any
}

const TypeSelector: React.FC<TypeSelectorProps> = ({
  initialTypes = [],
  typesDataSource = [],
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes)
  const router = useRouter()

  const updateURL = (selectedTypes: string[]): void => {
    let url = `?page=1&types=${selectedTypes.join(',')}`

    if (selectedTypes.length === 0) {
      url = `?page=1`
    }

    router.replace(url, {
      scroll: false,
    })
  }

  const handleTypeClick = (type: string): void => {
    setSelectedTypes((prev) => {
      const currentIndex = prev.indexOf(type)
      if (currentIndex === -1) {
        const newSelectedTypes = [...prev, type]
        updateURL(newSelectedTypes)
        return newSelectedTypes
      } else {
        const newSelectedTypes = prev.filter((item) => item !== type)
        updateURL(newSelectedTypes)
        return newSelectedTypes
      }
    })
  }



  return (
    <div className="my-16">
      <div className="flex items-center mx-4 my-4">
        <div className="mr-2 my-4 font-bold self-start">Types:</div>
        <div>
          {typesDataSource.map((type) => (
            <button
              key={type.name}
              className={`px-2 py-2 mx-2 my-2 border-green-500 border-2 rounded-md font-bold  ${
                selectedTypes.includes(type.name)
                  ? 'bg-green-500 text-white'
                  : 'text-green-500'
              }`}
              onClick={() => handleTypeClick(type.name)}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TypeSelector
