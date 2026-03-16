import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { DisplayData } from "./components/DisplayData";
import { LocationCard } from "./components/LocationCard";
import { useCharacterStore } from "./store/characterSlice";

const queryClient = new QueryClient();

function Dashboard() {
  const selectedCharacter = useCharacterStore(
    (state) => state.selectedCharacter,
  );

  return (
    <div>
      <DisplayData />

      {selectedCharacter && (
        <div className="p-4 flex flex-col gap-4">
          <LocationCard />
          {/* EpisodeCard goes here later */}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1 className="text-lg font-bold p-4">Characters</h1>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;
