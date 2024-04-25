import { useState, useEffect } from 'react';
import { getPhotos } from '../api/unsplashedApi/getPhotos.js';

export const usePhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const photoData = await getPhotos(page);
                setPhotos(photoData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchPhotos();
    }, [page]);

    return { photos, isLoading,setPage, error };
};