import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimplePokemon } from "@/pokemons";

interface PokemonsFavoriteState {
  [key: string]: SimplePokemon;
}

const initialState: PokemonsFavoriteState = {
  "1": { id: "1", name: "bulbasaur" },
  "2": { id: "2", name: "ivysaur" },
  "12": { id: "12", name: "butterfree" },
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    // acciones a realizar
    toogleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload;
      const { id } = pokemon;

      // si el id existe - se puede hacer tambien state[id] !== undefined
      if (!!state[id]) {
        delete state[id];
        return;
      }

      // si no existe el pokemon lo agrego a la action
      state[id] = pokemon;
    },
  },
});

export const { toogleFavorite } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
