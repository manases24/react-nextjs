"use client";

import { useAppSelector } from "@/redux/store";
import { PokemonGrid } from "./PokemonGrid";

export const PokemonFavorite = () => {
  const favoritePokemon = useAppSelector((state) => Object.values(state.pokemons));
  return <PokemonGrid pokemons={favoritePokemon} />;
};
