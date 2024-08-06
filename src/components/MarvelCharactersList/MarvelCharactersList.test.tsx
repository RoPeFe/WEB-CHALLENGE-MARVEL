import {render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {describe, it, vi, expect, beforeEach} from 'vitest';
import MarvelCharactersList from './index';
import {useMarvelCharactersContext} from '../../hooks/useMarvelCharactersContext';
import {MarvelCharactersProvider} from '../../context/MarvelCharacterContext';

// Mock del hook useMarvelCharactersContext
vi.mock('../../hooks/useMarvelCharactersContext', () => ({
    useMarvelCharactersContext: vi.fn(),
}));

describe('MarvelCharactersList', () => {
    const mockFetchCharacters = vi.fn();

    beforeEach(() => {
        // Limpiar mocks antes de cada prueba
        vi.clearAllMocks();
    });

    it('debería renderizar el título de favoritos si estamos en la página de favoritos', () => {
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            favoriteIds: [],
            characters: [],
            fetchCharacters: mockFetchCharacters,
        });

        render(
            <MemoryRouter initialEntries={['/fav']}>
                <MarvelCharactersProvider>
                    <Routes>
                        <Route path='/fav' element={<MarvelCharactersList />} />
                    </Routes>
                </MarvelCharactersProvider>
            </MemoryRouter>
        );

        expect(screen.getByText('Favorites')).toBeInTheDocument();
    });

    it('debería renderizar la lista de personajes filtrados si hay personajes', async () => {
        const mockCharacters = [
            {id: 1, name: 'Spider-Man', thumbnail: {path: 'path/to/spiderman'}, description: 'Hero'},
            {id: 2, name: 'Iron Man', thumbnail: {path: 'path/to/ironman'}, description: 'Hero'},
        ];

        // Configuración de los mocks
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            favoriteIds: [],
            characters: mockCharacters,
            fetchCharacters: mockFetchCharacters,
        });

        render(
            <MemoryRouter initialEntries={['/']}>
                <MarvelCharactersProvider>
                    <Routes>
                        <Route path='/' element={<MarvelCharactersList />} />
                    </Routes>
                </MarvelCharactersProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Spider-Man')).toBeInTheDocument();
            expect(screen.getByText('Iron Man')).toBeInTheDocument();
        });
    });

    it('debería llamar a fetchCharacters cuando el componente se monta si no hay personajes', () => {
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            favoriteIds: [],
            characters: [],
            fetchCharacters: mockFetchCharacters,
        });

        render(
            <MemoryRouter initialEntries={['/']}>
                <MarvelCharactersProvider>
                    <Routes>
                        <Route path='/' element={<MarvelCharactersList />} />
                    </Routes>
                </MarvelCharactersProvider>
            </MemoryRouter>
        );

        expect(mockFetchCharacters).toHaveBeenCalledWith({});
    });

    it('debería renderizar el componente de búsqueda', () => {
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            favoriteIds: [],
            characters: [],
            fetchCharacters: mockFetchCharacters,
        });

        render(
            <MemoryRouter initialEntries={['/']}>
                <MarvelCharactersProvider>
                    <Routes>
                        <Route path='/' element={<MarvelCharactersList />} />
                    </Routes>
                </MarvelCharactersProvider>
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText('SEARCH A CHARACTER...')).toBeInTheDocument();
    });
});
