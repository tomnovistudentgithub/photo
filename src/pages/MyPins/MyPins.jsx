import React, { useContext, useEffect } from 'react';
import PhotoCard from "../../components/PhotoCard/PhotoCard.jsx";
import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import './MyPins.css';
import PhotoPinner from "../../components/PhotoPinner/PhotoPinner.jsx";
import MostChosenTags from "../../components/MostChosenTags.jsx";


function MyPins () {
    const { isLoggedIn } = useContext(AuthContext);
    const { tagCounts, pinnedPhotos } = useContext(PinnedPhotosContext);
    const navigate = useNavigate();



    return (
        <div className="my-pins-container">
            <h1>Pinned </h1>

            <div className="grid-container">
                {pinnedPhotos.map((photo, index) => (
                    <div key={photo.id} className={`grid-item grid-item-${index}`}>
                        <img src={photo.url} alt={photo.alt_description}/>
                        <div className="pinButtonContainer">
                            <PhotoPinner photo={photo}/>
                        </div>
                        <p>{photo.username}</p>

                    </div>
                ))}
            </div>
            <div className="mypins-tag-container">
            <MostChosenTags tagCounts={tagCounts} />
            <h1>Tag counts</h1>
                </div>

            {/*<ul>*/}
            {/*    {Object.entries(tagCounts).map(([tag, count]) => (*/}
            {/*        <li key={tag}>*/}
            {/*            {tag}: {count}*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}


        </div>
    );
}

export default MyPins;