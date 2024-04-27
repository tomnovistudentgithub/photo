import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useMatch, useLocation, useNavigate} from 'react-router-dom';
import './NavBar.css';
import {AuthContext} from "../../contexts/AuthContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faEnvelope, faThumbtack, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import myPhotoMatch from '../../assets/MyPhotoMatch.png';

function NavBar() {
    let location = useLocation();
    let navigate = useNavigate();
    const { isLoggedIn, logout, isAdmin } = useContext(AuthContext);
    const matchMyPins = useMatch("/mypins");
    const matchAdmin = useMatch("/admin");


    const handleLoginClick = () => {
        navigate("/login", { state: { from: location.pathname } });
    };

    const handleLogoutClick = () => {
        logout();
        navigate("/");
    };

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
                            {isAdmin &&
                                <li>
                                    <NavLink to="/admin" className={matchAdmin ? "active-link" : ""}>
                                        <FontAwesomeIcon className="nav-icon" icon={faUserShield}/>
                                        <span className="nav-text">Admin</span>
                                    </NavLink>
                                </li>
                            }
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