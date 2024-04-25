import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useMatch, useLocation, useNavigate} from 'react-router-dom';
import './NavBar.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import myPhotoMatch from '../../assets/MyPhotoMatch.png';

function NavBar() {
    let location = useLocation();
    let navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const matchMyPins = useMatch("/mypins");


    const handleLoginClick = () => {
        navigate("/login", { state: { from: location.pathname } });
    };

    const handleLogoutClick = () => {
        logout();
        navigate("/");
    };


    // const checkToken = () => {
    //     const token = localStorage.getItem('token');
    //     const role = localStorage.getItem('role');
    //     if (token) {
    //         setIsLoggedIn(true);
    //         if (role === 'admin') {
    //             setIsAdmin(true);
    //         }
    //     } else {
    //         setIsLoggedIn(false);
    //         setIsAdmin(false);
    //     }
    // };



    // useEffect(() => {
    //     checkToken();
    //     window.addEventListener('storageChanged', checkToken);
    //     return () => {
    //         window.removeEventListener('storageChanged', checkToken);
    //     };
    // }, []);
    //
    // const throttledCheckToken = throttle(checkToken, 1000);
    // useEffect(() => {
    //     throttledCheckToken();
    //     window.addEventListener('storageChanged', throttledCheckToken);
    //     return () => {
    //         window.removeEventListener('storageChanged', throttledCheckToken);
    //     };
    // }, []);
    // const handleLoginClick = () => {
    //     navigate("/login", { state: { from: location.pathname } });
    // };


    //todo reading an admin role in a local storage is not secure, it should be saved in a secure httpOnly cookie and fetched from the server by using a token,
    //todo see whether the novi backend has the possibility to use role-based access control


    // const handleLogoutClick = () => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('role');
    //     localStorage.removeItem('user');
    //     setIsLoggedIn(false);
    //     navigate("/");
    // };

    //todo: add conditional admin portal link for users with admin rights
    //todo: add conditional login/logout button
    //todo: add conditional registration button
    //todo: make the topics dynamic based on a user choice

    return (
        <div className="flex-container">
            <div className="nav-wrapper">
                <nav>
                    <img className="photo-match-logo" src={myPhotoMatch} alt="My Photo Match"/>
                    <div className="nav-links">
                        <ul>
                            <li><NavLink to="/" className={useMatch("/") ? "active-link" : ""}><FontAwesomeIcon
                                className="nav-icon" icon={faHome}/><span className="nav-text">Home</span></NavLink>
                            </li>
                            <li><NavLink to="/about"
                                         className={useMatch("/about") ? "active-link" : ""}><FontAwesomeIcon
                                className="nav-icon" icon={faInfoCircle}/><span
                                className="nav-text">About</span></NavLink></li>
                            <li><NavLink to="/contact"
                                         className={useMatch("/contact") ? "active-link" : ""}><FontAwesomeIcon
                                className="nav-icon" icon={faEnvelope}/><span
                                className="nav-text">Contact</span></NavLink></li>
                            {isLoggedIn &&
                                <li><NavLink to="/mypins" className={matchMyPins ? "active-link" : ""}><FontAwesomeIcon
                                    className="nav-icon" icon={faThumbtack}/><span className="nav-text nav-text-mypins">My Pins</span></NavLink>
                                </li>}
                        </ul>
                    </div>
                    <div className="login-button">
                        {isLoggedIn ? (
                            <button className="login-logout-button" onClick={handleLogoutClick}><FontAwesomeIcon
                                className="login-icon"
                                icon={faSignOutAlt}/><span
                                className="login-text"> Logout</span></button>
                        ) : (
                            <button className="login-logout-button" onClick={handleLoginClick}><FontAwesomeIcon
                                className="login-icon"
                                icon={faSignInAlt}/><span
                                className="login-text"> Login</span></button>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;