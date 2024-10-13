import { PokemonGrid, PokemonsReponse, SimplePokemon } from "@/app/pokemons";

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
      <span className="text-5xl my-2">
        Listado de Pokemons <small>estatico</small>
      </span>
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
