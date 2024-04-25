import React, { useState } from 'react';
import backendEndpoint from "../../api/noviBackendApi/backendEndpoint.js";
import UserInfoButton from "../../components/InfoButton/UserInfoButton.jsx";
import downloadPhotoFromApi from "../../api/noviBackendApi/downloadPhotoFromApi.js";
import './AdminPortal.modules.css';

function AdminPortal() {
    const [username, setUsername] = useState('');
    const [photoUrl, setPhotoUrl] = useState(null);
    const [error, setError] = useState(null);



    const handleUsernameChange = (event) => {
        try {
        setUsername(event.target.value);
    } catch (error) {
        setError(error.message);
    }
    }


    const handleDownloadPhoto = async () => {
        try {
            if (!username) {
                throw new Error('Username is required');
            }
            const url = await downloadPhotoFromApi(username);
            setPhotoUrl(url);
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div className="outer-container-admin">
            <div className="inner-container-admin">

            <h1>Admin Portal</h1>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
            </form>
            <UserInfoButton username={username} />
            <button className="download-button" onClick={handleDownloadPhoto}>Download user photo</button>

            {error && <div>{error}</div>}
            </div>
        </div>
    );
}

export default AdminPortal;