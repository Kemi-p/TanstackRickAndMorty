import './App.css'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { DisplayData } from './components/DisplayData'

const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className='text-lg font-bold p-4'>
        Characters
      </h1>
      <DisplayData/>

    </QueryClientProvider>
  
  )
}

export default App
