import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {MarvelComicParams} from '../types/MarvelComics';
import {getMarvelComicFrontPageUrl} from '../services/marvelComicService';

const useMarvelComicFrontPageUrl = ({resourceURI}: MarvelComicParams) => {
    const [frontPageUrl, setfrontPageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const hasFetchedOnce = useRef(false);

    const fetchMarvelComicFrontPage = useCallback(async () => {
        try {
            setLoading(true);

            const response = await getMarvelComicFrontPageUrl({resourceURI});

            setfrontPageUrl(response);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }, [resourceURI]);

    useEffect(() => {
        if (!hasFetchedOnce.current) {
            fetchMarvelComicFrontPage();
            hasFetchedOnce.current = true;
        }
    }, [fetchMarvelComicFrontPage]);

    return useMemo(() => ({frontPageUrl, loading, error}), [frontPageUrl, loading, error]);
};

export default useMarvelComicFrontPageUrl;
