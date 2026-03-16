import { useQueries } from "@tanstack/react-query"
import { useEpisodeStore } from "../store/episodeSlice"
import type { Episode } from "../types/type"

export function EpisodeCard(){
     const episodeUrls = useEpisodeStore((state) => state.episodeUrls)

     const episodeQueries = useQueries({
    queries: episodeUrls.map((url) => ({
      queryKey: ['episode', url],
      queryFn: () => fetch(url).then((r) => r.json()),
      enabled: !!url
    }))
  })

  const isLoading = episodeQueries.some((q) => q.isPending)

  if (isLoading) return <span className="loading loading-spinner loading-md"></span>

  const episodes: Episode[] = episodeQueries
    .map((q) => q.data)
    .filter(Boolean)
console.log('episodeUrls:', episodeUrls)
     return (
    <div className="card bg-base-100 shadow p-6 gap-2">
      <h2 className="card-title">Episodes</h2>
      <div className="flex flex-col gap-2">
        {episodes.map((episode) => (
          <div key={episode.id} className="flex items-center gap-3 border-b border-base-200 pb-2">
            <span className="badge badge-primary badge-sm">{episode.episode}</span>
            <span className="font-medium">{episode.name}</span>
            <span className="text-xs text-base-content/50 ml-auto">{episode.air_date}</span>
          </div>
        ))}
      </div>
    </div>
  )
  
}

