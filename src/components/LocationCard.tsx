import { useLocationStore } from "../store/locationSlice";
import type { Location } from "../types/type";
import { useQuery } from '@tanstack/react-query'

export function LocationCard(){
    const locationUrl= useLocationStore((state) => state.locationUrl)
    const { data, isPending, error } = useQuery({
    queryKey: ['location', locationUrl],
    queryFn: () => fetch(locationUrl).then(r => r.json()),
    enabled: !!locationUrl
  })

  if (!locationUrl) return (
    <p className="text-base-content/50">Select a character to see their location</p>
  )

  if (isPending) return <span className="loading loading-spinner loading-md"></span>

  if (error) return <p className="text-error">Failed to load location</p>

  const location: Location = data

  return (
    <div className="card bg-base-100 shadow p-6 gap-2">
      <h2 className="card-title">Location</h2>
      <p><span className="font-semibold">Name:</span> {location.name}</p>
      <p><span className="font-semibold">Type:</span> {location.type}</p>
      <p><span className="font-semibold">Dimension:</span> {location.dimension}</p>
      <p><span className="font-semibold">Residents:</span> {location.residents.length}</p>
    </div>
  )
}

 