import React, {useContext, useEffect, useState} from 'react';
import PinnedPhotosContext from './PinnedPhotoContext.js';
import changeUserInfoField from "../api/noviBackendApi/changeUserInfoField.js";
import getUserInfoField from "../api/noviBackendApi/getUserInfoField.js";
import countTagsInPhotos from "../helpers/countTagsInPhotos.js";
import getPhotoFromDBWithId from "../api/getPhotoFromDBWithId.js";
import {AuthContext} from "./AuthContext.jsx";

const PinnedPhotosProvider = ({ children }) => {
    const [pinnedPhotosIds, setPinnedPhotosIds] = useState([]);
    const [pinnedPhotos, setPinnedPhotos] = useState([]);
    const [tagCounts, setTagCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const { isLoggedIn } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const fetchPinnedPhotos = async () => {
        console.log('Fetching pinned photos');
        let userInfo = await getUserInfoField();
        if (typeof userInfo === 'string') {
            userInfo = [userInfo];
        }
        setPinnedPhotosIds(userInfo || []);
        setLoading(false);
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setPinnedPhotos([]);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        fetchPinnedPhotos();
    }, [isLoggedIn]);

    useEffect(() => {
        const fetchPhotosByIds = async () => {
            setLoading(true);
            const photosPromises = pinnedPhotosIds.map(id => getPhotoFromDBWithId(id));
            let photos = await Promise.all(photosPromises);
            photos = photos.filter(photo => photo !== null);
            console.log('Photos:', photos);

            const photosWithDetails = photos.map(photo => {
                let tags;

                if (photo && photo.tags && photo.tags.length > 0) {
                    tags = photo.tags;
                } else {
                    tags = [];
                }
                return {
                    id: photo.id,
                    alt_description: photo.alt_description,
                    tags: tags,
                    url: photo.urls.regular,
                    username: photo.user.name,
                };
            });

            console.log('Photos with details:', photosWithDetails);

            setPinnedPhotos(photosWithDetails);
            console.log('Pinned photos with details:', pinnedPhotos);
            setLoading(false);
        };

        if (pinnedPhotosIds.length > 0) {
            fetchPhotosByIds();
        }
    }, [pinnedPhotosIds]);

    useEffect(() => {
        if (pinnedPhotos && pinnedPhotos.length > 0) {
            const counts = countTagsInPhotos(pinnedPhotos);
            setTagCounts(counts);
            console.log('Tag counts:', counts);


            const filteredCounts = Object.fromEntries(
                Object.entries(counts).filter(([tag, count]) => count > 5)
            );
            localStorage.setItem('tagCounts', JSON.stringify(filteredCounts));
        }
    }, [pinnedPhotos]);

    const togglePinPhoto = async (photo) => {
        let updatedPinnedPhotos;

        if (pinnedPhotosIds.includes(photo.id)) {
            updatedPinnedPhotos = pinnedPhotosIds.filter(pinnedPhotoId => pinnedPhotoId !== photo.id);
        } else {
            updatedPinnedPhotos = [...pinnedPhotosIds, photo.id];
        }


        try {
            await changeUserInfoField(updatedPinnedPhotos);
            setPinnedPhotosIds(updatedPinnedPhotos);

            setError(null);
        } catch (error) {
            console.error('Error updating user info:', error);
            setError('Failed to pin/unpin photo. Please try again later.');
        }
    }


    return (
        <PinnedPhotosContext.Provider value={{ pinnedPhotos, setPinnedPhotos, togglePinPhoto, fetchPinnedPhotos, tagCounts, error}}>
            {children}
        </PinnedPhotosContext.Provider>
    );
};

export default PinnedPhotosProvider;