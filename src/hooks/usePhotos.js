import { useState, useEffect } from 'react';
import { getPhotos } from '../api/unsplashedApi/getPhotos.js';

export const usePhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const photoData = await getPhotos();
                setPhotos(photoData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    return { photos, isLoading };
};