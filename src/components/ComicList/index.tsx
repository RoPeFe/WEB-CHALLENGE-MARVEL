import React from 'react';
import {Comics} from '../../types/Character';
import './ComicList.scss';
import ComicCard from '../ComicCard';
import {getFirstOlderTwentyComics} from '../../utils/common';

interface ComicListProps {
    comics: Comics;
}

const ComicList: React.FC<ComicListProps> = ({comics}) => {
    return (
        <>
            <h2>Comics</h2>
            <div className='comics-list'>
                {getFirstOlderTwentyComics(comics.items).map((comic, index) => {
                    return <ComicCard key={`${comic.name}-${index}`} comic={comic} />;
                })}
            </div>
        </>
    );
};

export default ComicList;
