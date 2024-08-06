import React, {useState, useEffect, useRef} from 'react';
import {ReactComponent as Search} from './../../assets/search.svg';
import {useMarvelCharactersContext} from '../../hooks/useMarvelCharactersContext';
import './SearchWrapper.scss';

const SearchWrapper: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const {characters, fetchCharacters, loading, error} = useMarvelCharactersContext();
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            if (inputValue.length >= 2) {
                fetchCharacters({nameStartsWith: inputValue});
            }
        }, 1000); // 1 segundo de retardo

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [inputValue, fetchCharacters]);

    return (
        <div className='search-wrapper'>
            <Search className='search-icon' />
            <input type='text' placeholder='SEARCH A CHARACTER...' value={inputValue} onChange={handleChange} />
            <div className='results'>{loading ? 'LOADING' : `${characters.length} RESULTS`}</div>
            {error && <div className='error'>An error occurred: {error.message}</div>}
        </div>
    );
};

export default SearchWrapper;
