import React from 'react';
import backendEndpoint from "./noviBackendApi/backendEndpoint.js";
import getUserInfoField from "./noviBackendApi/getUserInfoField.js";
import getUserFromTokenAndPassToken from "../helpers/getUserFromTokenAndPassToken.js";
import unsplashedEndpoint from "./unsplashedApi/unsplashedEndpoint.js";


async function GetPhotosFromDbByID() {
    const userAndToken = getUserFromTokenAndPassToken();

    const photoIds = await getUserInfoField(userAndToken);
    console.log('photoIds:', photoIds);

    if (photoIds === null) {
        return null;
    }

    const photos = [];
    for (const id of photoIds) {
        const photo = await getPhotoFromUnsplashedWithId(id);
        if (photo !== null) {
            photos.push(photo);
        }
    }
    return photos;
}

async function getPhotoFromUnsplashedWithId(id) {
    try {
        const response = await unsplashedEndpoint.get(`/photos/${id}`);

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error(`HTTP error status: ${error.response.status}`);
            console.log('Error message:', error.response.data);
            console.log('Error response:', error.response);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error', error.message);
        }
    }

    return null;
}

export default GetPhotosFromDbByID;