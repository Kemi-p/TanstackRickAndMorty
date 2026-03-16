import { useCharacterStore } from "../store/characterSlice";
import type { Character } from "../types/type";
import { useLocationStore } from "../store/locationSlice";

export function CharacterCard({ character }: { character: Character }) {
  const statusColor: Record<string, string> = {
    Alive: "badge-success",
    Dead: "badge-error",
    unknown: "badge-warning",
  };
  const setSelectedCharacter = useCharacterStore(
    (state) => state.setSelectedCharacter,
  );
  const selectedCharacter = useCharacterStore(
    (state) => state.selectedCharacter,
  );
  const setLocationUrl = useLocationStore((state) => state.setLocationUrl);

  const isSelected = selectedCharacter?.id === character.id;

  const handleClick = () => {
    setSelectedCharacter(character);
    setLocationUrl(character.location.url);
  };

  const colorClass = statusColor[character.status] ?? "badge-ghost";
  return (
    <div
      data-theme="sunset"
      onClick={handleClick}
      className={`card bg-base-100 w-72 shadow-xl hover:shadow-2xl transition-shadow duration-300 border cursor-pointer
        ${isSelected ? "border-primary border-2" : "border-base-300"} `}
    >
      <figure className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full object-cover"
        />
        <div
          className={`badge ${colorClass} absolute top-3 right-3 gap-1 font-semibold`}
        >
          <span className="w-2 h-2 rounded-full bg-current opacity-80"></span>
          {character.status}
        </div>
      </figure>

      <div className="card-body p-4 gap-2">
        <h2 className="card-title text-lg font-bold">{character.name}</h2>

        <div className="flex gap-1 flex-wrap">
          <span className="badge badge-outline badge-sm">
            Species: {character.species}
          </span>
          <span className="badge badge-outline badge-sm">
            Gender: {character.gender}
          </span>
          <span className="badge badge-outline badge-sm">
            Origin: {character.origin.name}
          </span>
        </div>

        <div className="mt-2">
          <p className="text-xs text-base-content/50 uppercase tracking-widest mb-1">
            Last seen
          </p>
          <p className="text-sm font-medium truncate">
            {character.location.name}
          </p>
        </div>
      </div>
    </div>
  );
}
