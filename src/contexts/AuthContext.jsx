import React, {createContext, useEffect, useState} from 'react';
import getUserRole from "../helpers/getUserRole.js";
import getUserFromTokenAndPassToken from "../helpers/getUserFromTokenAndPassToken.js";
import getUserRoleEmail from "../api/noviBackendApi/getUserRoleEmail.js";
import axios from "axios";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [authState, setAuthState] = useState({user: null, status: `pending`});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
           const userFromStorage = getUserFromTokenAndPassToken();
           const userAndToken = {userFromStorage, token }

            const fetchUser = async () => {
                try {
                    const user = await getUserRoleEmail(userAndToken);

                    setAuthState({
                        user: user,
                        status: 'done',
                    });
                    setIsLoggedIn(true);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setError(error.message);
                }
            };
            fetchUser();
        } else {
            setAuthState({
                user: null,
                status: 'done',
            });
            setIsLoggedIn(false);
            console.log(authState);
        } setLoading(false);
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const data = {
        ...authState,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
    };

    async function login(enteredUsername, enteredPassword) {
        try {
            const response = await axios.post('https://api.datavortex.nl/photomatch/users/authenticate', {
                username: enteredUsername,
                password: enteredPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                const data = response.data;
                localStorage.setItem('token', data.jwt);
                setIsLoggedIn(true);
                setAuthState({ user: enteredUsername, status: 'done' });
                console.log('User is logged in!');
                return true;

            } else {
                console.log('Error:', response);
                console.log(enteredUsername);
                throw response;
            }
        } catch (error) {
            console.error('Error:', error);
            console.log(enteredUsername);
            return false;
        }
    }

    function logout() {
        setAuthState({user: null, setAuthState: 'done'});
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={ data }>
            {authState.status === 'pending'
                ? <p>Loading...</p> :
                children
            }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;