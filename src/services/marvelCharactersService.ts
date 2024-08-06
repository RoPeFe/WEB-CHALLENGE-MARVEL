import {MarvelCharacterResponse} from '../types/MarvelCharacters';
import {MarvelCharacterParams} from '../types/Character';
import {formatApiUrlWithKeys} from '../utils/common';

export const getMarvelCharacters = async ({id, nameStartsWith, limit = 50}: MarvelCharacterParams): Promise<MarvelCharacterResponse> => {
    const API_URL = process.env.REACT_APP_API_URL as string;
    try {
        const urlWithKeys = formatApiUrlWithKeys(`${API_URL}${id ? `/${id}` : ''}`);
        const urlWithParams = id ? urlWithKeys : `${urlWithKeys}&limit=${limit}${nameStartsWith ? `&nameStartsWith=${nameStartsWith}` : ''}`;
        const response = await fetch(urlWithParams);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data: MarvelCharacterResponse = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching characters:', error);

        throw error;
    }
};
