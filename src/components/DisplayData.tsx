import { useQuery } from "@tanstack/react-query"
import { keepPreviousData } from "@tanstack/react-query"
import { useState } from "react"
import type { Character } from "../types/type"
import { CharacterCard } from "./CharacterCard"

 export function DisplayData() {
    const [page, setPage] = useState(1)
  const { isPending,error, data } = useQuery({
    queryKey: ['characterData', page],
    queryFn: () =>
      fetch(`https://rickandmortyapi.com/api/character?page=${page}`).then((res) =>
        res.json()
      ),
      placeholderData: keepPreviousData
  })

  if (isPending) return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  )
  if (error) return (
    <div role="alert" className="alert alert-error max-w-sm mx-auto mt-10">
      <span>Error: {error.message}</span>
    </div>
  )
  
  const characters: Character[] =data?.results?.slice(0,12) ?? []

  return (
    <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4" >
            {characters.map(character=>(
                <CharacterCard key={character.id} character={character}/>
            ))}
        </div>

        <div className="flex justify-center items-center gap-4 py-6">
            <button onClick={() => setPage(page=> page-1)} disabled ={page === 1}>
                Previous
            </button>

             <span className="font-semibold">Page {page} of {data?.info?.pages}</span>

           
            <button onClick={() => setPage(page=> page+1)} disabled={page === data?.info?.pages}>
                Next
            </button>
        
        </div>
    </div>
    
  )
}
