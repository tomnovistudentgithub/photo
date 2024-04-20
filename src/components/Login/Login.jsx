import React, {useContext, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './Login.modules.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const [token, setToken] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    let navigate = useNavigate();
    let location = useLocation();
    let data;

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            await login(username, password);
            let { from } = location.state || { from: { pathname: "/" } };
            navigate(from);
            console.log("location from login Page " + location.state);
        } catch (error) {
            console.error('Error:', error);
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
                {(userNameError || passwordError) && <p className="error-feedback">Username or password is incorrect</p>}
            </label>
            <input type="submit" value="Login" />

            <p>No account yet? Register your account now <a href="/registration">here</a></p>


        </form>
    );
}

export default Login;