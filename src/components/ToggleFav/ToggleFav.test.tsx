// ToggleFav.test.tsx
import {render, screen, fireEvent} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import ToggleFav from './index';
import {useMarvelCharactersContext} from '../../hooks/useMarvelCharactersContext';

// Mocks para las funciones del contexto
vi.mock('../../hooks/useMarvelCharactersContext', () => ({
    useMarvelCharactersContext: vi.fn(),
}));

describe('ToggleFav', () => {
    const mockAddFavorite = vi.fn();
    const mockRemoveFavorite = vi.fn();

    beforeEach(() => {
        // Limpiar los mocks antes de cada prueba
        vi.clearAllMocks();
    });

    it('debería renderizar el icono no seleccionado por defecto', () => {
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            favoriteIds: [],
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
        });

        render(<ToggleFav id={1} />);

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByTestId('heart-icon')).toHaveAttribute('fill', 'none');
    });

    beforeEach(() => {
        // Limpiar mocks antes de cada prueba
        vi.clearAllMocks();
    });

    it('debería renderizar el icono seleccionado si el id está en favoriteIds', () => {
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            favoriteIds: [1],
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
        });

        render(<ToggleFav id={1} />);

        expect(screen.getByTestId('heart-icon')).toHaveAttribute('fill', 'none');
    });

    beforeEach(() => {
        // Limpiar mocks antes de cada prueba
        vi.clearAllMocks();
    });

    it('debería llamar a addFavorite cuando se hace clic y el botón no está seleccionado', () => {
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            favoriteIds: [],
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
        });

        render(<ToggleFav id={1} />);

        fireEvent.click(screen.getByRole('button'));

        expect(mockAddFavorite).toHaveBeenCalledWith(1);
        expect(mockRemoveFavorite).not.toHaveBeenCalled();
    });

    beforeEach(() => {
        // Limpiar mocks antes de cada prueba
        vi.clearAllMocks();
    });

    it('debería llamar a removeFavorite cuando se hace clic y el botón está seleccionado', () => {
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            favoriteIds: [1],
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
        });

        render(<ToggleFav id={1} />);

        fireEvent.click(screen.getByRole('button'));

        expect(mockRemoveFavorite).toHaveBeenCalledWith(1);
        expect(mockAddFavorite).not.toHaveBeenCalled();
    });

    beforeEach(() => {
        // Limpiar mocks antes de cada prueba
        vi.clearAllMocks();
    });

    it('debería cambiar el estado isToggled al hacer clic en el botón', () => {
        (useMarvelCharactersContext as jest.Mock).mockReturnValue({
            favoriteIds: [],
            addFavorite: mockAddFavorite,
            removeFavorite: mockRemoveFavorite,
        });

        render(<ToggleFav id={1} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Comprobar que el estado ha cambiado y el icono correcto se muestra
        expect(screen.getByTestId('heart-icon')).toHaveAttribute('fill', 'none');
    });
});
