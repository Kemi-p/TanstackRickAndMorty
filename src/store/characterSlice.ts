import { create } from "zustand";
import type { Character } from "../types/type";
import { devtools } from "zustand/middleware";

interface CharacterStore {
  selectedCharacter: Character | null;
  setSelectedCharacter: (character: Character) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  devtools(
    (set) => ({
      selectedCharacter: null,
      setSelectedCharacter: (character) =>
        set(
          { selectedCharacter: character },
          undefined,
          "character/setSelected",
        ),
    }),
    { name: "CharacterStore" },
  ),
);
