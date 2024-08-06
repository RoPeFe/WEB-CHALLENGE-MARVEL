import {useContext} from 'react';
import MarvelCharactersContext from '../context/MarvelCharacterContext';

export const useMarvelCharactersContext = () => {
    const context = useContext(MarvelCharactersContext);

    if (!context) {
        throw new Error('useMarvelCharactersContext must be used within a MarvelCharactersProvider');
    }
    return context;
};
