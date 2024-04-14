import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";
import React, {useContext, useEffect, useState} from "react";
import getUserInfoField from "../../api/noviBackendApi/getUserInfoField.js";
import {faThumbtack, faBan} from "@fortawesome/free-solid-svg-icons";
import '/src/components/PhotoPinner/PhotoPinner.modules.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function PhotoPinner({photo}) {
    const { pinnedPhotos, setPinnedPhotos, togglePinPhoto } = useContext(PinnedPhotosContext);
    const [isPhotoPinned, setIsPhotoPinned] = useState(false);
    const handlePinPhoto = () => {
        togglePinPhoto(photo);
    }
    const handleUnpinPhoto = () => {
        togglePinPhoto(photo);
    }

    useEffect(() => {
        const isPinnedInDB = pinnedPhotos.some(pinnedPhoto => pinnedPhoto.id === photo.id);
        setIsPhotoPinned(isPinnedInDB);
    }, [photo.id, pinnedPhotos]);


    return (
        <div className="pinButtonContainer">
            {isPhotoPinned ? (
                <button onClick={handleUnpinPhoto}><FontAwesomeIcon icon={faBan} /> Unpin</button>
            ) : (
                <button onClick={handlePinPhoto}><FontAwesomeIcon icon={faThumbtack} /> Pin</button>
            )}
        </div>
    );
}


export default PhotoPinner;