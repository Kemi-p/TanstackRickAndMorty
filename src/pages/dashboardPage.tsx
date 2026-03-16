import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "../store/characterSlice";

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
    </div>
  );
}
