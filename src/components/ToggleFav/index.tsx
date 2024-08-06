import React, {useEffect, useState} from 'react';
import {ReactComponent as HeartIconSelected} from './../../assets/heart-icon-selected.svg';
import {ReactComponent as HeartIconUnselected} from './../../assets/heart-icon-unselected.svg';
import {useMarvelCharactersContext} from '../../hooks/useMarvelCharactersContext';
import './ToggleFav.scss';

interface ToggleFavProps {
    id: number;
}
const ToggleFav: React.FC<ToggleFavProps> = ({id}) => {
    const {favoriteIds, addFavorite, removeFavorite} = useMarvelCharactersContext();
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        if (favoriteIds.includes(id)) {
            setIsToggled(true);
        }
    }, [favoriteIds, id]);

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        if (isToggled) {
            removeFavorite(id);
        } else {
            addFavorite(id);
        }

        setIsToggled(!isToggled);
    };

    return (
        <button className='toggle-fav' onClick={handleToggle}>
            {isToggled ? <HeartIconSelected data-testid='heart-icon' /> : <HeartIconUnselected data-testid='heart-icon' />}
        </button>
    );
};

export default ToggleFav;
