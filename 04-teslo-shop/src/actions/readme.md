# Formulario con Server Actions en Next.js 15

Este proyecto muestra cómo usar **Server Actions** en Next.js 15 con un ejemplo sencillo de un formulario que guarda datos de usuario (username y country) y realiza una llamada a la API de la Pokédex.

---

## ¿Qué son las Server Actions?

Las **Server Actions** en Next.js 15 son funciones que se ejecutan directamente en el servidor, pero que puedes llamar desde el cliente (tu navegador) como si fueran funciones normales. Esto simplifica mucho el manejo de lógica del lado del servidor.

### **Ventajas principales:**

1. **Facilidad de uso:** No necesitas crear rutas API manualmente.
2. **Seguridad:** Como se ejecutan en el servidor, puedes manejar lógica o datos sensibles sin exponerlos al cliente.
3. **Optimización:** Next.js optimiza la comunicación entre el cliente y el servidor.

---

## Ejemplo del proyecto

Este proyecto incluye:

- Un formulario donde el usuario ingresa su `username` y `country`.
- Una **Server Action** que guarda estos datos y llama a la API de la Pokédex para obtener información de Pikachu.

### **Estructura del proyecto:**

```
.
├── app/
│   ├── actions.ts       # Contiene la Server Action
│   ├── page.tsx         # Página principal con el formulario
│
├── public/
├── styles/
├── package.json
├── tsconfig.json
├── next.config.js
└── ...
```

---

### **1. Archivo `app/actions.ts`**

Aquí definimos la Server Action que maneja la lógica:

```ts
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

---

### **2. Archivo `app/page.tsx`**

Este archivo contiene el formulario y llama a la Server Action:

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

---

### **3. ¿Qué es un handler route y en qué se diferencia de las Server Actions?**

#### **¿Qué es un handler route?**

Los **handler routes** son rutas API tradicionales que defines en el backend de tu aplicación Next.js. Sirven para manejar solicitudes HTTP (como `GET`, `POST`, `PUT`, `DELETE`, etc.) y devolver respuestas al cliente. Se definen en la carpeta `/app/api` y funcionan como endpoints de una API REST.

##### **Ejemplo de handler route:**

Archivo: `app/api/pokemon/route.ts`

```ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const pokemonResponse = await fetch(
    "https://pokeapi.co/api/v2/pokemon/pikachu"
  );
  const pokemonData = await pokemonResponse.json();

  return NextResponse.json({
    pokemon: pokemonData.name,
    pokemonType: pokemonData.types.map((t: any) => t.type.name).join(", "),
  });
}
```

Aquí estás creando un endpoint (`/api/pokemon`) que devuelve información de Pikachu.

---

### **Diferencias clave entre handler routes y Server Actions**

| **Aspecto**             | **Handler Routes**                                                         | **Server Actions**                                                                             |
| ----------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Definición**          | Funciones que se ejecutan en el servidor para manejar solicitudes HTTP.    | Funciones que también se ejecutan en el servidor pero se llaman directamente desde el cliente. |
| **Uso**                 | Ideal para crear endpoints de una API REST.                                | Ideal para manejar lógica backend sin necesidad de crear un endpoint separado.                 |
| **Forma de llamar**     | Se utiliza `fetch` o librerías HTTP en el cliente para hacer la solicitud. | Se llaman directamente como funciones en el código cliente.                                    |
| **Seguridad**           | Igual de segura, pero requiere manejar headers y permisos manualmente.     | Abstrae la comunicación cliente-servidor, haciendo el flujo más sencillo.                      |
| **Configuración extra** | Necesitas definir rutas y manejar la comunicación explícitamente.          | Simplifica tareas comunes como guardar datos o llamar APIs externas.                           |

---

¡Listo! Ahora puedes explorar el funcionamiento de las Server Actions y los handler routes en Next.js 15.
