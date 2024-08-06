import {Character} from './Character';

export interface MarvelCharacterResponse {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    etag: string;
    data: MarvelData;
}

interface MarvelData {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Character[];
}
