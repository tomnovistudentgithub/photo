import React, {useContext} from 'react';
import './PhotoCard.modules.css';
import PhotoPinner from "../PhotoPinner/PhotoPinner.jsx";
import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";

function PhotoCard({ photo }) {

    const {error} = useContext(PinnedPhotosContext);

    return (
        <div className="photo-card-inner-container">
            <div className="photo-card-image-container">
                <img className="photo-card-image" src={photo.urls.small} alt={photo.alt_description}/>
                <PhotoPinner photo={photo}/>
            </div>
            <div className="photo-card-info">
                <p>{photo.user && "Photo from Unsplashed user: "} </p>
                <b> {photo.user.username}</b>
                {error && <p>{error}</p>}
            </div>
        </div>


    );
}

export default PhotoCard;