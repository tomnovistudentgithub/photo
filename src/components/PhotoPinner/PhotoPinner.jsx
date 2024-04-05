import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";
import {useContext, useEffect, useState} from "react";
import getUserInfoField from "../../api/noviBackendApi/getUserInfoField.js";

function PhotoPinner({photo}) {
    const { pinnedPhotos, pinPhoto, unpinPhoto } = useContext(PinnedPhotosContext);
    const [isPhotoPinned, setIsPhotoPinned] = useState(false);
    const handlePinPhoto = () => {
        pinPhoto(photo);
    }
    const handleUnpinPhoto = () => {
        unpinPhoto(photo);
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfoField();
            const isPinnedInDB = userInfo && userInfo.includes(photo.id);
            setIsPhotoPinned(isPinnedInDB);
        };
        fetchUserInfo();
    }, [photo.id]);

    useEffect(() => {
        setIsPhotoPinned(pinnedPhotos.includes(photo.id));
    }, [pinnedPhotos, photo.id]);




    return (
        <div>
        {isPhotoPinned ? (
            <button onClick={handleUnpinPhoto}>Unpin</button>
        ) : (
            <button onClick={handlePinPhoto}>Pin</button>
            )}
        </div>
    );
}

export default PhotoPinner;