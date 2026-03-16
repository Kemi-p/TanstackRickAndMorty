import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "../store/characterSlice";
import { LocationCard } from "../components/LocationCard";

export function DashboardPage() {
  const selectedCharacter = useCharacterStore(
    (state) => state.selectedCharacter,
  );
  const nav = useNavigate();

  if (!selectedCharacter) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-base-content/50">No character selected</p>
        <button className="btn btn-primary" onClick={() => nav("/")}>
          Go back 
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4">

      <div className="flex items-center gap-4">
        <button className="btn btn-outline btn-sm" onClick={() => nav("/")}>
          ← Back
        </button>
        <h1 className="text-lg font-bold">Dashboard</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        
        <div className="card bg-base-100 shadow p-6 flex flex-col gap-4">
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            className="w-40 h-40 rounded-full mx-auto object-cover"
          />
          <h2 className="text-xl font-bold text-center">{selectedCharacter.name}</h2>
          <div className="flex flex-col gap-2">
            <p><span className="font-semibold">Status:</span> {selectedCharacter.status}</p>
            <p><span className="font-semibold">Species:</span> {selectedCharacter.species}</p>
            <p><span className="font-semibold">Gender:</span> {selectedCharacter.gender}</p>
            <p><span className="font-semibold">Origin:</span> {selectedCharacter.origin.name}</p>
            <p><span className="font-semibold">Episodes:</span> {selectedCharacter.episode.length}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <LocationCard />
        </div>
    </div>
    </div>
  );
}
