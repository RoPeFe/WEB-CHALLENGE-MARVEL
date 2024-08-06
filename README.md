# Marvel Web Challenge

Una aplicación web para explorar y gestionar personajes de Marvel. Los usuarios pueden ver detalles de los personajes, agregar o quitar favoritos, y
buscar personajes por nombre.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
4. [Arquitectura y Estructura](#arquitectura-y-estructura)
5. [Pruebas](#pruebas)

## Requisitos

-   [Node.js](https://nodejs.org/) (v18.16.0)
-   [pnpm](https://pnpm.io/es/) (v8.15.1)

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/RoPeFe/WEB-CHALLENGE-MARVEL.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd WEB-CALLENGE-MARVEL
    ```

3. Instala las dependencias:

    ```bash
    pnpm install
    ```

## Ejecución de la Aplicación

Para iniciar la aplicación en modo desarrollo, ejecuta:

```bash
    pnpm run dev
```

## Arquitectura y Estructura

La aplicación está estructurada de la siguiente manera:

```bash
└── 📁src
    └── App.css
    └── App.tsx
    └── 📁assets
        └── heart-icon-selected.svg
        └── heart-icon-unselected.svg
        └── marvel-logo.svg
        └── search.svg
    └── 📁components
        └── 📁ComicCard
            └── ComicCard.scss
            └── index.tsx
        └── 📁ComicList
            └── ComicList.scss
            └── index.tsx
        └── 📁FavoriteCounter
            └── index.tsx
        └── 📁Header
            └── Header.scss
            └── index.tsx
        └── 📁MarvelCharacter
            └── index.tsx
            └── MarvelCharacter.scss
        └── 📁MarvelCharacterSheet
            └── index.tsx
            └── MarvelCharacterSheet.scss
            └── MarvelCharacterSheet.test.tsx
        └── 📁MarvelCharactersList
            └── index.tsx
            └── MarvelCharactersList.scss
            └── MarvelCharactersList.test.tsx
        └── 📁SearchWrapper
            └── index.tsx
            └── SearchWrapper.scss
            └── SearchWrapper.test.tsx
        └── 📁ToggleFav
            └── index.tsx
            └── ToggleFav.scss
            └── ToggleFav.test.tsx
    └── 📁context
        └── MarvelCharacterContext.tsx
    └── custom.d.ts
    └── 📁hooks
        └── useMarvelCharactersContext.tsx
        └── useMarvelComicFrontPageUrl.tsx
    └── index.css
    └── main.tsx
    └── 📁services
        └── marvelCharactersService.ts
        └── marvelComicService.ts
    └── setupTests.ts
    └── 📁styles
        └── variables.scss
    └── 📁types
        └── Character.ts
        └── MarvelCharacters.ts
        └── MarvelComics.ts
    └── 📁utils
        └── common.test.ts
        └── common.ts
    └── vite-env.d.ts
```

## Pruebas

Las pruebas se ejecutan usando Vitest y React Testing Library. Para ejecutar las pruebas, utiliza:

```bash
    pnpm vitest
```
