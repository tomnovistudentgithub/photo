import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useMatch, useLocation, useNavigate} from 'react-router-dom';
import './NavBar.css';
import { throttle } from 'lodash';
import {AuthContext} from "../../contexts/AuthContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    let location = useLocation();
    let navigate = useNavigate();
    const { isLoggedIn, logout } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const matchMyPins = useMatch("/mypins");


    console.log(location);
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
               <ul>
                   <li><NavLink to="/" className={useMatch("/") ? "active-link" : ""}>Home</NavLink></li>
                   <li><NavLink to="/topic/nature" className={useMatch("/topic/nature") ? "active-link" : ""}>Nature
                       Photos</NavLink></li>
                   <li><NavLink to="/about" className={useMatch("/about") ? "active-link" : ""}>About</NavLink></li>
                   <li><NavLink to="/contact" className={useMatch("/contact") ? "active-link" : ""}>Contact</NavLink></li>
                   {isLoggedIn && <li><NavLink to="/mypins" className={matchMyPins ? "active-link" : ""}><FontAwesomeIcon icon={faThumbtack} className="thumbtack-icon-navbar" /> My Pins</NavLink></li>}
               </ul>
               <div className="login-button">
                   {isLoggedIn ? (
                       <button onClick={handleLogoutClick}>Logout</button>
                   ) : (
                       <button onClick={handleLoginClick}>Login</button>
                   )}
               </div>
           </nav>
       </div>
        </div>
    );
}

export default NavBar;