import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import type { Character } from "../types/type";
import { CharacterCard } from "./CharacterCard";
export function DisplayData() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState('')
const [gender, setGender] = useState('')

  const { isPending, error, data } = useQuery({
    queryKey: ["characterData", page, search, status,gender],
    queryFn: () =>
      fetch(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${search}&status=${status}&gender=${gender}`,
      ).then((res) => res.json()),
    placeholderData: keepPreviousData,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); 
  };

  const handleStatus = (value: string) => {
  setStatus(value)
  setPage(1)
}

const handleGender = (value: string) => {
  setGender(value)
  setPage(1)
}

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  if (error)
    return (
      <div role="alert" className="alert alert-error max-w-sm mx-auto mt-10">
        <span>Error: {error.message}</span>
      </div>
    );
  if (data?.error)
    return (
      <div role="alert" className="alert alert-warning max-w-sm mx-auto mt-10">
        <span>No characters found for "{search}"</span>
      </div>
    );

  const characters: Character[] = data?.results?.slice(0, 12) ?? [];

  return (
    <div>
      <div className="flex gap-2 p-4 flex-wrap">
        <input
          type="text"
          placeholder="search by characters name"
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
         <select
    className="select select-bordered"
    value={status}
    onChange={e => handleStatus(e.target.value)}
  >
    <option value="">All Statuses</option>
    <option value="alive">Alive</option>
    <option value="dead">Dead</option>
    <option value="unknown">Unknown</option>
  </select>

  <select
    className="select select-bordered"
    value={gender}
    onChange={e => handleGender(e.target.value)}
  >
    <option value="">All Genders</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="genderless">Genderless</option>
    <option value="unknown">Unknown</option>
  </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 py-6">
        <button
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {data?.info?.pages}
        </span>

        <button
          onClick={() => setPage((page) => page + 1)}
          disabled={page === data?.info?.pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
