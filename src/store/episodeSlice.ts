import { create } from "zustand";
import type { Character } from "../types/type";
import { devtools } from "zustand/middleware";

interface CharacterStore {
  episodeUrls: string[];
  setEpisodeUrls: (urls: string[]) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  devtools(
    (set) => ({
      episodeUrls: [],
      setEpisodeUrls: (urls) =>
        set(
          { episodeUrls: urls },
          undefined,
          "character/setSelected",
        ),
    }),
    { name: "EpisodeStore" },
  ),
);