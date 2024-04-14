import axios from "axios";
import backendEndpoint from "./backendEndpoint.js";

async function uploadPhotoToApi(username, formData) {
    try {
        const response = await backendEndpoint.post(`/users/${username}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*'
            }
        });

        if (response.status === 200) {
            console.log('Photo uploaded successfully');
        } else {
            console.log('Photo upload failed');
        }

        return response;
    } catch (error) {
        console.error('Error uploading photo:', error);
    }
}

export default uploadPhotoToApi;