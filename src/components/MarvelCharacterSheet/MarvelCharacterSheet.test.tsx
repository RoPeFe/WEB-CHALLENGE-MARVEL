import {render, screen, waitFor} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import {describe, it, vi, expect, beforeEach} from 'vitest';
import MarvelCharacterSheet from './index';
import {useMarvelCharactersContext} from '../../hooks/useMarvelCharactersContext';
import {MarvelCharactersProvider} from '../../context/MarvelCharacterContext';

// Mock del hook useMarvelCharactersContext
vi.mock('../../hooks/useMarvelCharactersContext', () => ({
    useMarvelCharactersContext: vi.fn(),
}));

describe('MarvelCharacterSheet', () => {
    const mockFetchCharacters = vi.fn();
    const mockCharacter = {
        id: 1,
        name: 'Spider-Man',
        description: 'Hero',
        modified: '2014-04-29T14:18:17-0400',
        thumbnail: {path: 'path/to/spiderman', extension: 'jpg'},
        resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011334',
        comics: {
            available: 1,
            collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/comics',
            items: [
                {
                    resourceURI: 'http://gateway.marvel.com/v1/public/comics/21366',
                    name: 'Avengers: The Initiative (2007) #14',
                },
            ],
            returned: 1,
        },
        series: {
            available: 1,
            collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
            items: [
                {
                    resourceURI: 'http://gateway.marvel.com/v1/public/series/1945',
                    name: 'Avengers: The Initiative (2007 - 2010)',
                },
            ],
            returned: 1,
        },
        stories: {
            available: 1,
            collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
            items: [
                {
                    resourceURI: 'http://gateway.marvel.com/v1/public/stories/19947',
                    name: 'Cover #19947',
                    type: 'cover',
                },
            ],
            returned: 1,
        },
        events: {
            available: 1,
            collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/events',
            items: [
                {
                    resourceURI: 'http://gateway.marvel.com/v1/public/events/269',
                    name: 'Secret Invasion',
                },
            ],
            returned: 1,
        },
        urls: [
            {
                type: 'detail',
                url: 'http://marvel.com/characters/74/3-d_man?utm_campaign=apiRef&utm_source=422c32a7c4c3f9adfe3f4aef0db1a1e8',
            },
        ],
    };

    beforeEach(() => {
        // Limpiar mocks antes de cada prueba
        vi.clearAllMocks();
    });

    it('debería mostrar "Load character" cuando se está cargando', () => {
        // Configuración de los mocks
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            characters: [],
            fetchCharacters: mockFetchCharacters,
            loading: true,
            error: null,
        });

        render(
            <MemoryRouter initialEntries={['/characters/1']}>
                <MarvelCharactersProvider>
                    <Routes>
                        <Route path='/characters/:id' element={<MarvelCharacterSheet />} />
                    </Routes>
                </MarvelCharactersProvider>
            </MemoryRouter>
        );

        expect(screen.getByText('Load character')).toBeInTheDocument();
    });

    it('debería mostrar "Could not load character" cuando hay un error', () => {
        // Configuración de los mocks
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            characters: [],
            fetchCharacters: mockFetchCharacters,
            loading: false,
            error: new Error('Failed to fetch'),
        });

        render(
            <MemoryRouter initialEntries={['/characters/1']}>
                <MarvelCharactersProvider>
                    <Routes>
                        <Route path='/characters/:id' element={<MarvelCharacterSheet />} />
                    </Routes>
                </MarvelCharactersProvider>
            </MemoryRouter>
        );

        expect(screen.getByText('Could not load character')).toBeInTheDocument();
    });

    it('debería mostrar "No character found" cuando el personaje no se encuentra', () => {
        // Configuración de los mocks
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            characters: [],
            fetchCharacters: mockFetchCharacters,
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter initialEntries={['/characters/1']}>
                <MarvelCharactersProvider>
                    <Routes>
                        <Route path='/characters/:id' element={<MarvelCharacterSheet />} />
                    </Routes>
                </MarvelCharactersProvider>
            </MemoryRouter>
        );

        expect(screen.getByText('No character found')).toBeInTheDocument();
    });

    it('debería mostrar el personaje cuando se encuentra', async () => {
        // Configuración de los mocks
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            favoriteIds: [],
            characters: [mockCharacter],
            fetchCharacters: mockFetchCharacters,
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter initialEntries={['/characters/1']}>
                <MarvelCharactersProvider>
                    <Routes>
                        <Route path='/characters/:id' element={<MarvelCharacterSheet />} />
                    </Routes>
                </MarvelCharactersProvider>
            </MemoryRouter>
        );

        // Verificar que el personaje se muestra correctamente
        await waitFor(() => {
            expect(screen.getByText('Spider-Man')).toBeInTheDocument();
            expect(screen.getByText('Hero')).toBeInTheDocument();
        });
    });

    it('debería llamar a fetchCharacters cuando el componente se monta y no hay personajes', () => {
        // Configuración de los mocks
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            characters: [],
            fetchCharacters: mockFetchCharacters,
            loading: false,
            error: null,
        });

        render(
            <MemoryRouter initialEntries={['/characters/1']}>
                <MarvelCharactersProvider>
                    <Routes>
                        <Route path='/characters/:id' element={<MarvelCharacterSheet />} />
                    </Routes>
                </MarvelCharactersProvider>
            </MemoryRouter>
        );

        expect(mockFetchCharacters).toHaveBeenCalledWith({id: 1});
    });
});
