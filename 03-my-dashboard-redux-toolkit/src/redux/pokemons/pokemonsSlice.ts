import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimplePokemon } from "@/pokemons";

interface PokemonsFavoriteState {
  favorites: { [key: string]: SimplePokemon };
}

const initialState: PokemonsFavoriteState = {
  favorites: {},
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    // acciones a realizar
    setFavoritePokemons(
      state,
      action: PayloadAction<{ [key: string]: SimplePokemon }>
    ) {
      state.favorites = action.payload;
    },

    toogleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemon = action.payload;
      const { id } = pokemon;

      // si el id existe - se puede hacer tambien state[id] !== undefined
      if (!!state.favorites[id]) {
        delete state.favorites[id];
        return;
      }

      // si no existe el pokemon lo agrego a la action
      state.favorites[id] = pokemon;
    },
  },
});

export const { toogleFavorite, setFavoritePokemons } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
