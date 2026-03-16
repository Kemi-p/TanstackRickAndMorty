import { useQueries } from "@tanstack/react-query"
import { useEpisodeStore } from "../store/episodeSlice"

export function EpisodeCard(){
     const episodeUrls = useEpisodeStore((state) => state.episodeUrls)


  
}
