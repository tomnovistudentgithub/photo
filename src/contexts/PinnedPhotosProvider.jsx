import React, { useState } from 'react';
import PinnedPhotosContext from './PinnedPhotoContext.js';
import changeUserInfoField from "../api/noviBackendApi/changeUserInfoField.js";

const PinnedPhotosProvider = ({ children }) => {
    const [pinnedPhotos, setPinnedPhotos] = useState([]);

     const pinPhoto = async (photo) => {
        const updatedPinnedPhotos = [...pinnedPhotos, photo.id];
        console.log(`Pinned photo: ${photo.id}`);
        localStorage.setItem('pinnedPhotos', JSON.stringify(updatedPinnedPhotos));

        try {
            await changeUserInfoField(updatedPinnedPhotos);
            console.log('changeInfoField executed successfully');
            setPinnedPhotos(updatedPinnedPhotos);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };
    const unpinPhoto = async (photo) => {
        const updatedPinnedPhotos = pinnedPhotos.filter(pinnedPhotoId => pinnedPhotoId !== photo.id);
        console.log(`Unpinned photo: ${photo.id}`);
        localStorage.setItem('pinnedPhotos', JSON.stringify(updatedPinnedPhotos));

        try {
            await changeUserInfoField(updatedPinnedPhotos);
            console.log('changeInfoField executed successfully');
            setPinnedPhotos(updatedPinnedPhotos);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    return (
        <PinnedPhotosContext.Provider value={{ pinnedPhotos, pinPhoto, unpinPhoto }}>
            {children}
        </PinnedPhotosContext.Provider>
    );
};

export default PinnedPhotosProvider;