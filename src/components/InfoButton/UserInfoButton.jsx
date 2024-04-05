import getToken from "../../helpers/getToken.js";
import {useState} from "react";
import backendEndpoint from "../../api/noviBackendApi/backendEndpoint.js";
import getUserRole from "../../helpers/getUserRole.js";
import PropTypes from 'prop-types';

function UserInfoButton({ username }) {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);


    const handleClick = async () => {
        try {
            const token = getToken();
            console.log('Token:', token);
            console.log(username);
            const response = await backendEndpoint.get(`/users/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status >= 200 && response.status < 300) {
                console.log('Response:', response);
                const userInfo = response.data;
                console.log('User Info:', userInfo);
                const userRole = getUserRole(userInfo);

                setUserInfo(userInfo);
                console.log('User Role:', userRole);
                setUserRole(userRole);
                setError(null);

            } else {
                console.error('Response:', response);
                console.error('Response Status:', response.status);
                throw new Error('Error getting user info else');
            }
        } catch (error) {
            console.error('Error getting user info catch block:', error);
            setUserInfo(null);
            setError('Error getting user info catch');

        }
    };

    return (
        <div>
            <button onClick={handleClick}>Get User Info</button>
            {userInfo && <div>User Info: {JSON.stringify(userInfo)}</div>}
            {error && <div>{error}</div>}
            {/*{userRole === 'ADMIN' && <div>Welcome, admin!</div>}*/}
            {/*{userRole === 'USER' && <div>Welcome, user!</div>}*/}
            {userInfo && <div> Welcome, {userInfo.username} </div>}
        </div>
    );
}

UserInfoButton.propTypes = {
    username: PropTypes.string.isRequired,
};
export default UserInfoButton;