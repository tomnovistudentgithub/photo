import React from 'react';
import { Link } from 'react-router-dom';
import './PhotoCard.modules.css';
import PhotoPinner from "../PhotoPinner/PhotoPinner.jsx";

function PhotoCard({ photo }) {
    return (
        <div className="photo-card-inner-container">
            <div className="photo-card-image-container">
                <img className="photo-card-image" src={photo.urls.small} alt={photo.alt_description}/>
                <PhotoPinner photo={photo}/>
            </div>
            <div className="photo-card-info">
                <p>{photo.user && "Photo from Unsplashed user: "} </p>
                <b> {photo.user.username}</b>
            </div>
        </div>


    );
}

export default PhotoCard;