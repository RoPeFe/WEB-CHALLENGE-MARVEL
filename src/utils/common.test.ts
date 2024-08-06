import {describe, it, expect} from 'vitest';
import {getCleanTitleAndYear, getFirstOlderTwentyComics, checkExistenceCharacter, checkExistenceFavsInCharacters} from './common';
import {Character, ComicItem} from '../types/Character';

// Test para getCleanTitleAndYear
describe('getCleanTitleAndYear', () => {
    it('debería extraer el título y el año de un texto con el formato esperado', () => {
        const result = getCleanTitleAndYear('Amazing Spider-Man (2020) #1 (Variant)');
        expect(result).toEqual({
            title: 'Amazing Spider-Man #1 (Variant)',
            year: '2020',
        });
    });

    it('debería devolver el texto original si no coincide con el formato esperado', () => {
        const result = getCleanTitleAndYear('Spider-Man Comic');
        expect(result).toEqual({
            title: 'Spider-Man Comic',
            year: '',
        });
    });
});

// Test para getFirstOlderTwentyComics
describe('getFirstOlderTwentyComics', () => {
    it('debería devolver los 20 cómics más antiguos ordenados por año', () => {
        const comics: ComicItem[] = [
            {name: 'Comic A (2010)', resourceURI: 'http://example.com/comic-a'},
            {name: 'Comic B (2005)', resourceURI: 'http://example.com/comic-b'},
            {name: 'Comic C (2015)', resourceURI: 'http://example.com/comic-c'},
            {name: 'Comic D (1998)', resourceURI: 'http://example.com/comic-d'},
            {name: 'Comic E (2005)', resourceURI: 'http://example.com/comic-E'},
            {name: 'Comic F (2015)', resourceURI: 'http://example.com/comic-F'},
            {name: 'Comic G (2011)', resourceURI: 'http://example.com/comic-G'},
            {name: 'Comic H (2011)', resourceURI: 'http://example.com/comic-H'},
            {name: 'Comic I (2011)', resourceURI: 'http://example.com/comic-I'},
            {name: 'Comic J (2011)', resourceURI: 'http://example.com/comic-J'},
            {name: 'Comic K (2011)', resourceURI: 'http://example.com/comic-K'},
            {name: 'Comic L (2019)', resourceURI: 'http://example.com/comic-L'},
            {name: 'Comic M (2011)', resourceURI: 'http://example.com/comic-M'},
            {name: 'Comic N (2011)', resourceURI: 'http://example.com/comic-N'},
            {name: 'Comic O (2011)', resourceURI: 'http://example.com/comic-O'},
            {name: 'Comic P (2011)', resourceURI: 'http://example.com/comic-P'},
            {name: 'Comic Q (2011)', resourceURI: 'http://example.com/comic-Q'},
            {name: 'Comic R (2011)', resourceURI: 'http://example.com/comic-R'},
            {name: 'Comic S (2011)', resourceURI: 'http://example.com/comic-S'},
            {name: 'Comic T (2011)', resourceURI: 'http://example.com/comic-T'},
            {name: 'Comic U (2011)', resourceURI: 'http://example.com/comic-U'},
            {name: 'Comic V (2011)', resourceURI: 'http://example.com/comic-V'},
            {name: 'Comic W (2011)', resourceURI: 'http://example.com/comic-W'},
            {name: 'Comic X (2011)', resourceURI: 'http://example.com/comic-X'},
            {name: 'Comic Y (2011)', resourceURI: 'http://example.com/comic-Y'},
            {name: 'Comic Z (2011)', resourceURI: 'http://example.com/comic-Z'},
        ];

        const result = getFirstOlderTwentyComics(comics);
        expect(result).toHaveLength(20);
        expect(result[0].name).toBe('Comic D (1998)');
        expect(result[1].name).toBe('Comic B (2005)');
    });
});

// Test para checkExistenceCharacter
describe('checkExistenceCharacter', () => {
    it('debería devolver true si el personaje existe en la lista', () => {
        const characters: Character[] = [
            {
                id: 1,
                name: 'Spider-Man',
                description: 'Hero',
                modified: '2014-04-29T14:18:17-0400',
                thumbnail: {path: 'path/to/spiderman', extension: 'jpg'},
                resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011334',
                comics: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/comics',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/comics/21366',
                            name: 'Avengers: The Initiative (2007) #14',
                        },
                    ],
                    returned: 1,
                },
                series: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/series/1945',
                            name: 'Avengers: The Initiative (2007 - 2010)',
                        },
                    ],
                    returned: 1,
                },
                stories: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/stories/19947',
                            name: 'Cover #19947',
                            type: 'cover',
                        },
                    ],
                    returned: 1,
                },
                events: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/events',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/events/269',
                            name: 'Secret Invasion',
                        },
                    ],
                    returned: 1,
                },
                urls: [
                    {
                        type: 'detail',
                        url: 'http://marvel.com/characters/74/3-d_man?utm_campaign=apiRef&utm_source=422c32a7c4c3f9adfe3f4aef0db1a1e8',
                    },
                ],
            },
        ];
        const result = checkExistenceCharacter(characters, 1);
        expect(result).toBe(true);
    });

    it('debería devolver false si el personaje no existe en la lista', () => {
        const characters: Character[] = [];
        const result = checkExistenceCharacter(characters, 1);
        expect(result).toBe(false);
    });
});

// Test para checkExistenceFavsInCharacters
describe('checkExistenceFavsInCharacters', () => {
    it('debería devolver una lista de IDs de personajes favoritos que existen en la lista de personajes', () => {
        const characters: Character[] = [
            {
                id: 1,
                name: 'Spider-Man',
                description: 'Hero',
                modified: '2014-04-29T14:18:17-0400',
                thumbnail: {path: 'path/to/spiderman', extension: 'jpg'},
                resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011334',
                comics: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/comics',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/comics/21366',
                            name: 'Avengers: The Initiative (2007) #14',
                        },
                    ],
                    returned: 1,
                },
                series: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/series/1945',
                            name: 'Avengers: The Initiative (2007 - 2010)',
                        },
                    ],
                    returned: 1,
                },
                stories: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/stories/19947',
                            name: 'Cover #19947',
                            type: 'cover',
                        },
                    ],
                    returned: 1,
                },
                events: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/events',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/events/269',
                            name: 'Secret Invasion',
                        },
                    ],
                    returned: 1,
                },
                urls: [
                    {
                        type: 'detail',
                        url: 'http://marvel.com/characters/74/3-d_man?utm_campaign=apiRef&utm_source=422c32a7c4c3f9adfe3f4aef0db1a1e8',
                    },
                ],
            },
            {
                id: 2,
                name: 'Iron Man',
                description: 'Hero',
                modified: '2014-04-29T14:18:17-0400',
                thumbnail: {path: 'path/to/spiderman', extension: 'jpg'},
                resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011334',
                comics: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/comics',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/comics/21366',
                            name: 'Avengers: The Initiative (2007) #14',
                        },
                    ],
                    returned: 1,
                },
                series: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/series/1945',
                            name: 'Avengers: The Initiative (2007 - 2010)',
                        },
                    ],
                    returned: 1,
                },
                stories: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/series',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/stories/19947',
                            name: 'Cover #19947',
                            type: 'cover',
                        },
                    ],
                    returned: 1,
                },
                events: {
                    available: 1,
                    collectionURI: 'http://gateway.marvel.com/v1/public/characters/1011334/events',
                    items: [
                        {
                            resourceURI: 'http://gateway.marvel.com/v1/public/events/269',
                            name: 'Secret Invasion',
                        },
                    ],
                    returned: 1,
                },
                urls: [
                    {
                        type: 'detail',
                        url: 'http://marvel.com/characters/74/3-d_man?utm_campaign=apiRef&utm_source=422c32a7c4c3f9adfe3f4aef0db1a1e8',
                    },
                ],
            },
        ];
        const favs = [1, 3]; // ID 3 no existe en los personajes
        const result = checkExistenceFavsInCharacters(characters, favs);
        expect(result).toEqual([1]);
    });

    it('debería devolver una lista vacía si no hay personajes favoritos en la lista de personajes', () => {
        const characters: Character[] = [];
        const favs = [1, 2];
        const result = checkExistenceFavsInCharacters(characters, favs);
        expect(result).toEqual([]);
    });
});
