# Server Actions en Next.js 15: Ejemplo Sencillo 🚀

Las Server Actions en Next.js 15 son una forma de escribir funciones que se ejecutan directamente en el servidor, pero que se llaman desde el cliente (tu navegador) de manera muy sencilla.

Con ellas, puedes manejar cosas como guardar datos en una base de datos, llamar a una API externa o realizar tareas que no quieres que pasen en el cliente, todo sin preocuparte tanto por configurar un API tradicional (como con `fetch` o `axios`).

### Ventajas clave:

- **Facilidad de uso:** No necesitas crear un endpoint separado (como en una API REST). Simplemente defines tu función en el servidor y la llamas.
- **Seguridad:** Como se ejecutan en el servidor, puedes manejar lógica o datos sensibles sin exponerlos al cliente.
- **Optimización:** Next.js optimiza la comunicación entre el cliente y el servidor.

---

## Ejemplo sencillo: Formulario y llamada a la Pokédex

En este ejemplo, el usuario ingresa su `username` y `country` en un formulario. Al enviarlo:

1. Se guarda esa información.
2. Se llama a la API de la Pokédex para obtener información de un Pokémon (en este caso, **Pikachu**).
3. Se muestran los resultados en pantalla.

---

### Paso 1: Crear la Server Action

#### Archivo: `app/actions.ts`

```typescript
// app/actions.ts
export async function saveUserAndFetchPokemon(data: FormData) {
  // Leer datos del formulario
  const username = data.get("username") as string;
  const country = data.get("country") as string;

  // Simular guardar en base de datos (esto sería un insert real en tu DB)
  console.log(`Guardando usuario: ${username}, País: ${country}`);

  // Llamar a la API de la Pokédex
  const pokemonResponse = await fetch(
    "https://pokeapi.co/api/v2/pokemon/pikachu"
  );
  const pokemonData = await pokemonResponse.json();

  // Retornar los datos del Pokémon
  return {
    username,
    country,
    pokemon: pokemonData.name,
    pokemonType: pokemonData.types.map((t: any) => t.type.name).join(", "),
  };
}
```

Esta función:

- **Recibe** los datos del formulario.
- Simula guardar el `username` y `country` en la base de datos.
- Llama a la API de la Pokédex para obtener información de Pikachu.
- **Devuelve** los datos del usuario y del Pokémon.

---

### Paso 2: Crear el formulario en el cliente

#### Archivo: `app/page.tsx`

```tsx
"use client";

import { useState } from "react";
import { saveUserAndFetchPokemon } from "./actions";

export default function Home() {
  const [result, setResult] = useState<any>(null); // Guardar los resultados

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Capturar datos del formulario
    const data = await saveUserAndFetchPokemon(formData); // Llamar a la Server Action
    setResult(data); // Mostrar resultados
  };

  return (
    <main>
      <h1>Formulario + Pokédex</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <label>
          Country:
          <input type="text" name="country" required />
        </label>
        <button type="submit">Enviar</button>
      </form>

      {result && (
        <div>
          <h2>Resultado:</h2>
          <p>Usuario: {result.username}</p>
          <p>País: {result.country}</p>
          <p>Pokémon: {result.pokemon}</p>
          <p>Tipo de Pokémon: {result.pokemonType}</p>
        </div>
      )}
    </main>
  );
}
```

Este componente:

- Crea un formulario donde el usuario ingresa `username` y `country`.
- Llama a la Server Action al enviar el formulario.
- Muestra los datos retornados (usuario y Pokémon).

---

### Resultado esperado

Cuando llenas el formulario y lo envías, deberías ver algo como esto:

```
Usuario: Ash
País: Japón
Pokémon: pikachu
Tipo de Pokémon: electric
```

---

### Resumen

1. **Server Actions** te permiten escribir funciones que corren en el servidor pero que puedes llamar desde el cliente.
2. Son seguras y simplifican el manejo de datos sensibles o llamadas a APIs externas.
3. Este ejemplo muestra lo fácil que es combinar formularios con lógica del servidor usando Next.js 15.
