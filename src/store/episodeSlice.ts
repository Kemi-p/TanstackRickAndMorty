import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CharacterStore {
  episodeUrls: string[];
  setEpisodeUrls: (urls: string[]) => void;
}

export const useEpisodeStore = create<CharacterStore>()(
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