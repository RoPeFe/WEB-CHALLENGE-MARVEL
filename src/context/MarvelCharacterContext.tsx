import React, {createContext, useState, ReactNode, useCallback} from 'react';
import {Character, MarvelCharacterParams} from '../types/Character';
import {getMarvelCharacters} from '../services/marvelCharactersService';
import {checkExistenceFavsInCharacters} from '../utils/common';

export interface MarvelCharactersContextType {
    characters: Character[];
    setCharacters: (characters: Character[]) => void;
    fetchCharacters: ({id, nameStartsWith, limit}: MarvelCharacterParams) => Promise<void>;
    loading: boolean;
    error: Error | null;
    favoriteIds: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
}

const MarvelCharactersContext = createContext<MarvelCharactersContextType | undefined>(undefined);

export const MarvelCharactersProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    const fetchCharacters = useCallback(
        async ({id, nameStartsWith, limit}: MarvelCharacterParams) => {
            setLoading(true);
            try {
                const response = await getMarvelCharacters({id, nameStartsWith, limit});
                setCharacters(response.data.results);
                setFavoriteIds(checkExistenceFavsInCharacters(response.data.results, favoriteIds));
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        },
        [favoriteIds]
    );

    const addFavorite = (id: number) => {
        setFavoriteIds(prev => {
            if (!prev.includes(id)) {
                const favs = [...prev, id];
                return checkExistenceFavsInCharacters(characters, favs);
            }

            return prev;
        });
    };

    const removeFavorite = (id: number) => {
        setFavoriteIds(prev => prev.filter(favId => favId !== id));
    };

    return (
        <MarvelCharactersContext.Provider
            value={{characters, setCharacters, fetchCharacters, loading, error, favoriteIds, addFavorite, removeFavorite}}
        >
            {children}
        </MarvelCharactersContext.Provider>
    );
};

export default MarvelCharactersContext;
