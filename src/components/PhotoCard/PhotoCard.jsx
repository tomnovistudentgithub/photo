import React from 'react';
import { Link } from 'react-router-dom';
import './PhotoCard.modules.css';

function PhotoCard({ photo }) {
    return (
        <div className="photo-card trapezoid">
            <Link to={`/photo/${photo.id}`}>
                <img src={photo.urls.small} alt={photo.alt_description}/>
            </Link>
            <div className="photo-card-info">
                <h3>{photo.id}</h3>
                <p>{photo.alt_description}</p>
                <div>
                    {photo.user && "Photo from Unsplashed user: " + photo.user.username}
                </div>
                <div>
                    {photo.tags && photo.tags.map((tag, index) => (
                        <span key={index}>{tag.title + " "}</span>
                    ))}
                </div>

                <div>{photo.tags.map((tag) => tag.title).join(', ')}</div>
            </div>
        </div>

    );
}

export default PhotoCard;