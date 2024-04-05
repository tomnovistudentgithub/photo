import React, { useState } from 'react';
import backendEndpoint from "../../api/noviBackendApi/backendEndpoint.js";
import UserInfoButton from "../../components/InfoButton/UserInfoButton.jsx";

function AdminPortal() {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    return (
        <div>
            <h1>Admin Portal</h1>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
            </form>
            <UserInfoButton username={username} />
        </div>
    );
}

export default AdminPortal;