import React from 'react';
import {Link} from 'react-router-dom';
import {Character} from '../../types/Character';
import ToggleFav from '../ToggleFav';
import './MarvelCharacter.scss';

interface MarvelCharacterProps {
    character: Character;
}

const MarvelCharacter: React.FC<MarvelCharacterProps> = ({character}) => {
    return (
        <>
            {character && (
                <article className='character-card'>
                    <Link to={`/character/${character.id}`}>
                        <div className='character-photo'>
                            <img src={`${character.thumbnail.path}/standard_xlarge.jpg`} alt={character.name} />
                        </div>
                        <div className='character-info'>
                            <p className='name'>{character.name}</p>
                            <ToggleFav id={character.id} />
                        </div>
                    </Link>
                </article>
            )}
        </>
    );
};

export default MarvelCharacter;
