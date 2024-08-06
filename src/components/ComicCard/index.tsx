import React from 'react';
import {ComicItem} from '../../types/Character';
import useMarvelComicFrontPageUrl from '../../hooks/useMarvelComicFrontPageUrl';
import {getCleanTitleAndYear} from '../../utils/common';
import './ComicCard.scss';

interface ComicCardProps {
    comic: ComicItem;
}

const ComicCard: React.FC<ComicCardProps> = ({comic}) => {
    const {resourceURI, name} = comic;
    const {frontPageUrl, loading, error} = useMarvelComicFrontPageUrl({resourceURI});
    const {title, year} = getCleanTitleAndYear(name);

    if (loading) {
        return <p>Load image</p>;
    }

    if (error) {
        return <p>Could not load image</p>;
    }

    return (
        <>
            {frontPageUrl && (
                <article className='comic-card'>
                    <div className='comic-front-page'>
                        <img src={frontPageUrl} alt={name} />
                    </div>
                    <div className='comic-info'>
                        <p className='name'>{title}</p>
                        <p className='year'>{year}</p>
                    </div>
                </article>
            )}
        </>
    );
};

export default ComicCard;
