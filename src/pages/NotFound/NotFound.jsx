import React from 'react';
import {Link} from "react-router-dom";
import './NotFound.modules.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret, faSearch } from '@fortawesome/free-solid-svg-icons';
function NotFound() {
    return <>
        <div className="detective-search">
             <FontAwesomeIcon className="search-icon" icon={faSearch}/>
        </div>
        <h1>Ooooh that's probably not what you expected...but we cannot find the page. Go back <Link className="my-link"
                                                                                                     to="/">home</Link>
        </h1>
    </>

}

export default NotFound;