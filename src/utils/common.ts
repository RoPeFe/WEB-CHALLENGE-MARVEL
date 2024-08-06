import md5 from 'md5';
import {Character, ComicItem} from '../types/Character';

// Función para formatear con las claves las llamadas a la api
export const formatApiUrlWithKeys = (endpoint: string): string => {
    const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY as string;
    const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY as string;

    const TS = 1;
    const HASH = md5(`${TS}${PRIVATE_KEY}${PUBLIC_KEY}`);

    return `${endpoint}?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${HASH}`;
};

export const getCleanTitleAndYear = (text: string): {title: string; year: string} => {
    const regex = /^(.+?) \((\d{4})\)(?: #(\d+))?(?: \((.+)\))?$/;
    const match = text.match(regex);

    if (match) {
        const title = match[1].trim(); // El título antes de los paréntesis
        const year = match[2]; // El año dentro de los paréntesis
        const number = match[3]; // El número después del símbolo #
        const variant = match[4] || null; // La variante opcional al final (puede ser null si no existe)

        return {
            title: `${title}${number ? ` #${number}` : ''}${variant ? ` (${variant})` : ''}`,
            year,
        };
    } else {
        return {
            title: text,
            year: '',
        };
    }
};

export const getFirstOlderTwentyComics = (comics: ComicItem[]): ComicItem[] => {
    const sortedComics = comics.sort((a, b) => {
        const {year: yearA} = getCleanTitleAndYear(a.name);
        const {year: yearB} = getCleanTitleAndYear(b.name);

        return Number(yearA) - Number(yearB);
    });

    return sortedComics.slice(0, 20);
};

export const checkExistenceCharacter = (characters: Character[], id: number): boolean => {
    return typeof characters.find(character => character.id === id) !== 'undefined';
};

export const checkExistenceFavsInCharacters = (characters: Character[], favs: number[]): number[] => {
    return characters.filter(character => favs.includes(character.id)).map(character => character.id);
};
