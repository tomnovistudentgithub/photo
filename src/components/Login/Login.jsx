import React, {useContext, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './Login.modules.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [token, setToken] = useState('');
    const [loginError, setLoginError]  = useState('');
    let navigate = useNavigate();
    let location = useLocation();


    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const loginSuccess = await login(username, password);
            if (loginSuccess) {
                // let { from } = location.state || { from: { pathname: "/" } };
                setLoginError('');
                let { from } = location.state || { from: { pathname: "/" } };
                navigate(from);
                console.log("location from login Page " + location.pathname);
            } else {
                setLoginError('Username or password is incorrect');
            }
            } catch (error) {
            console.error('Error:', error);
            setLoginError('An error occurred while logging in');
        }
    }

        // const user = {
        //     username: username,
        //     password: password
        // };
        //




        //     } else {
        //         throw response;
        //     }
        // } catch (error) {
        //     if (error instanceof Response) {
        //         console.error(`HTTP error status: ${error.status}`);
        //         error.text().then(errorMessage => {
        //             console.log('Error message:', errorMessage);
        //             setUserNameError(true);
        //             setPasswordError(true);
        //             console.log(userNameError);
        //         });
        //         error.headers.forEach((value, name) => console.log(`${name}: ${value}`));
        //
        //     } else {
        //         console.error('Error:', error);
        //     }
        // }


    return (
        <form onSubmit={handleSubmit}>


            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {loginError && <p className="error-feedback">{loginError}</p>}
            </label>
            <input type="submit" value="Login" />

            <p>No account yet? Register your account now <a href="/registration">here</a></p>


        </form>
    );
}

export default Login;