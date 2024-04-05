import { useState, useEffect } from 'react';
import { getTopics } from '../api/unsplashedApi/getTopics.js';

export const useTopics = () => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const topicData = await getTopics(1, 8);
                setTopics(topicData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchTopics();
    }, []);

    return { topics, isLoading };
};