import React from 'react';
import {ReactComponent as HeartIconSelected} from './../../assets/heart-icon-selected.svg';
import {useMarvelCharactersContext} from '../../hooks/useMarvelCharactersContext';

const FavoriteCounter: React.FC = () => {
    const {favoriteIds} = useMarvelCharactersContext();

    return (
        <>
            <HeartIconSelected /> <div className='number'>{favoriteIds.length}</div>
        </>
    );
};

export default FavoriteCounter;
