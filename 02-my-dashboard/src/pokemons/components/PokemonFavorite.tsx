"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { PokemonGrid } from "./PokemonGrid";
import { IoHeartOutline } from "react-icons/io5";

export const PokemonFavorite = () => {
  const favoritePokemon = useAppSelector((state) =>
    Object.values(state.pokemons.favorites)
  );

  return (
    <>
      {favoritePokemon.length === 0 ? (
        <NoFavorites />
      ) : (
        <PokemonGrid pokemons={favoritePokemon} />
      )}
    </>
  );
};

export const NoFavorites = () => {
  return (
    <div className="flex flex-col h-[50vh] items-center justify-center ">
      <IoHeartOutline size={100} className="text-red-500" />
      <span>No hay favoritos</span>
    </div>
  );
};
