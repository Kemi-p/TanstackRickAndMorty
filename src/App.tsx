import './App.css'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

function DisplayData() {
  const { isPending, data } = useQuery({
    queryKey: ['characterData', page],
    queryFn: () =>
      fetch(`https://rickandmortyapi.com/api/character?page=${page}`).then((res) =>
        res.json()
      ),
  })

  if (isPending) return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  )
  
  const characters =data?.results?.slice(0,10) ?? []

  const statusColor: Record<string, string> = {
    Alive: 'badge-success',
    Dead: 'badge-error',
    unknown: 'badge-warning',
  }

  const colorClass =statusColor[data.status] ?? 'badge-ghost'

  return (
    <div data-theme='pastel' className="card bg-base-100 w-72 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-300">
      <figure className="relative">
        <img src={data.image} alt={data.name} className="w-full object-cover" />
        <div className={`badge ${colorClass} absolute top-3 right-3 gap-1 font-semibold`}>
          <span className="w-2 h-2 rounded-full bg-current opacity-80"></span>
          {data.status}
        </div>
      </figure>

      <div className="card-body p-4 gap-2">
        <h2 className="card-title text-lg font-bold">{data.name}</h2>
        
        <div className="flex gap-1 flex-wrap">
          <span className="badge badge-outline badge-sm">Species: {data.species}</span>
          <span className="badge badge-outline badge-sm">Gender: {data.gender}</span>
          <span className="badge badge-outline badge-sm">Origin: {data.origin.name}</span>
        </div>

        <div className="mt-2">
          <p className="text-xs text-base-content/50 uppercase tracking-widest mb-1">Last seen</p>
          <p className="text-sm font-medium truncate">{data.location.name}</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className='text-lg font-bold'>
        Characters
      </h1>
      <DisplayData/>

    </QueryClientProvider>
  
  )
}

export default App
