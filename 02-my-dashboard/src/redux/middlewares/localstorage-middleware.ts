import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "../store";

// https://redux-toolkit.js.org/api/getDefaultMiddleware
// Middleware son funciones que se ejecutan en algun lugar en el tiempo (??
// Middleware personalizado para Redux que interactúa con el almacenamiento local
export const localStorageMiddleware = (state: MiddlewareAPI) => {
  // Devuelve una función que intercepta la siguiente acción en la cadena de middlewares
  return (next: Dispatch) => (action: Action) => {
    // Llama a la siguiente función del middleware con la acción proporcionada
    // Esto asegura que la acción sea procesada por los reductores y otros middlewares
    next(action);

    // Verifica si el tipo de la acción es "pokemons/toggleFavorite"
    // Este tipo de acción indica que se debe actualizar la lista de Pokémon favoritos
    if (action.type === "pokemons/toggleFavorite") {
      // Obtiene el estado actual de la aplicación desde Redux.
      const { pokemons } = state.getState() as RootState;

      // Serializa el estado de los Pokémon favoritos y lo almacena en localStorage
      localStorage.setItem("favorite-pokemons", JSON.stringify(pokemons));

      // Finaliza la ejecución del middleware
      return;
    }
  };
};
