import React, {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Character} from '../../types/Character';
import ComicList from '../ComicList';
import {useMarvelCharactersContext} from '../../hooks/useMarvelCharactersContext';
import './MarvelCharacterSheet.scss';
import ToggleFav from '../ToggleFav';
import {checkExistenceCharacter} from '../../utils/common';

const MarvelCharacterSheet: React.FC = () => {
    const {characters, loading, error, fetchCharacters} = useMarvelCharactersContext();
    const {id} = useParams();
    const characterId = Number(id);
    const character = characters.find((character: Character) => character.id === characterId);
    const existeneCharacter = checkExistenceCharacter(characters, characterId);
    const hasFetchedOnce = useRef(false);

    useEffect(() => {
        if (characters.length === 0 || (!existeneCharacter && !hasFetchedOnce.current)) {
            fetchCharacters({id: characterId});
            hasFetchedOnce.current = true;
        }
    }, [characterId, fetchCharacters, characters.length, existeneCharacter]);

    if (loading) {
        return <p>Load character</p>;
    }

    if (error) {
        return <p>Could not load character</p>;
    }

    if (!character) {
        return <p>No character found</p>;
    }

    return (
        <article className='character-sheet'>
            <div className='character-detail'>
                <div className='character-detail-grid'>
                    <div className='character-photo'>
                        <img src={`${character.thumbnail.path}/standard_xlarge.jpg`} alt={character.name} />
                    </div>
                    <div className='character-info'>
                        <h1 className='name'>{character.name}</h1>
                        <p className='description'>{character.description}</p>
                        <ToggleFav id={character.id} />
                    </div>
                </div>
            </div>
            <div className='character-comics'>
                <ComicList comics={character.comics} />
            </div>
        </article>
    );
};

export default MarvelCharacterSheet;
