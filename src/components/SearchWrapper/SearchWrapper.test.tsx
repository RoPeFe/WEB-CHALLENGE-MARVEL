import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import SearchWrapper from './index';
import {useMarvelCharactersContext} from '../../hooks/useMarvelCharactersContext';

// Mock del hook useMarvelCharactersContext
vi.mock('../../hooks/useMarvelCharactersContext', () => ({
    useMarvelCharactersContext: vi.fn(),
}));

describe('SearchWrapper', () => {
    const mockFetchCharacters = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('debería llamar a fetchCharacters después de 1 segundo de escritura con al menos 2 caracteres', async () => {
        // Configuración de los mocks
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            characters: [],
            fetchCharacters: mockFetchCharacters,
            loading: false,
            error: null,
        });

        render(<SearchWrapper />);

        fireEvent.change(screen.getByPlaceholderText('SEARCH A CHARACTER...'), {target: {value: 'Sp'}});

        await waitFor(
            () => {
                // Verifica que fetchCharacters se ha llamado con los parámetros esperados
                expect(mockFetchCharacters).toHaveBeenCalledWith({nameStartsWith: 'Sp'});
            },
            {timeout: 1500}
        );
    });
});
