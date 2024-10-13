import Image from "next/image";
import { PokemonsReponse, SimplePokemon } from "@/app/pokemons";

async function getPokemon(limit = 20, offset = 0): Promise<SimplePokemon[]> {
  const data: PokemonsReponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}1&offset=${offset}`
  ).then((res) => res.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!, // not-null operator
    name: pokemon.name,
  }));

  return pokemons;
}

export default async function PokemonPage() {
  const pokemons = await getPokemon(151);
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-10 items-center justify-center">
        {pokemons.map((pokemon) => (
          <Image
            key={pokemon.id}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            width={100}
            height={100}
            alt={pokemon.name}
            priority={false}
          />
        ))}
      </div>
    </div>
  );
}
