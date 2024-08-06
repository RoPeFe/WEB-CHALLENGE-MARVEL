import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as MarvelLogo} from './../../assets/marvel-logo.svg';
import FavoriteCounter from '../FavoriteCounter';
import {useMarvelCharactersContext} from '../../hooks/useMarvelCharactersContext';
import './Header.scss';

const Header: React.FC = () => {
    const {favoriteIds} = useMarvelCharactersContext();

    return (
        <header>
            <Link to={'/'}>
                <MarvelLogo className='header-logo' />
            </Link>
            {favoriteIds.length > 0 ? (
                <Link className='fav-counter' to={'/fav'}>
                    <FavoriteCounter />
                </Link>
            ) : (
                <div className='fav-counter'>
                    <FavoriteCounter />
                </div>
            )}
        </header>
    );
};

export default Header;
