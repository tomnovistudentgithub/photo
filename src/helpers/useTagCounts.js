import { useEffect, useState } from 'react';
import useGetPhotosFromDbByID from "../api/getPhotoFromDBWithId.js";
import countTagsInPhotos from "./countTagsInPhotos.js";



function useTagCounts() {
    const [tagCounts, setTagCounts] = useState(null);
    const photos = useGetPhotosFromDbByID();


    useEffect(() => {

        if (photos) {
            const counts = countTagsInPhotos(photos);
            setTagCounts(counts);
        }
    }, [photos]);

    return tagCounts;
}

export default useTagCounts;