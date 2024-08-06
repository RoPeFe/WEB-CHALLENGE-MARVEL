import {MarvelComicParams} from '../types/MarvelComics';
import {formatApiUrlWithKeys} from '../utils/common';

export const getMarvelComicFrontPageUrl = async ({resourceURI}: MarvelComicParams): Promise<string> => {
    try {
        const response = await fetch(formatApiUrlWithKeys(resourceURI));

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        return `${data.data.results[0].thumbnail.path}/portrait_xlarge.jpg`;
    } catch (error) {
        console.error('Error fetching comic:', error);

        throw error;
    }
};
