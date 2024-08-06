import React, {useEffect, useRef} from 'react';
import MarvelCharacter from '../MarvelCharacter';
import {Character} from '../../types/Character';
import {useLocation} from 'react-router-dom';
import SearchWrapper from '../SearchWrapper';
import {useMarvelCharactersContext} from '../../hooks/useMarvelCharactersContext';
import './MarvelCharactersList.scss';

const MarvelCharactersList: React.FC = () => {
    const {characters, fetchCharacters} = useMarvelCharactersContext();

    const {favoriteIds} = useMarvelCharactersContext();
    const location = useLocation();
    const isOnFavPage = location.pathname === '/fav';
    const charactersFilter = !isOnFavPage ? characters : characters.filter(character => favoriteIds.includes(character.id));
    const hasFetchedOnce = useRef(false);

    useEffect(() => {
        if (!hasFetchedOnce.current && characters.length <= 0) {
            fetchCharacters({});
            hasFetchedOnce.current = true;
        }
    }, [fetchCharacters, characters.length]);

    return (
        <>
            {isOnFavPage ? <h2>Favorites</h2> : null}

            <SearchWrapper />
            <section className='characters-list'>
                {charactersFilter && charactersFilter?.length > 0
                    ? charactersFilter.map((character: Character) => {
                          return <MarvelCharacter key={character.id} character={character} />;
                      })
                    : null}
            </section>
        </>
    );
};

export default MarvelCharactersList;
