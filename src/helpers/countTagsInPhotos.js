import {getPhotos} from "../api/unsplashedApi/getPhotos.js";
import getPhotoFromDBWithId from "../api/getPhotoFromDBWithId.js";

async function countTagsInPhotos() {


    //toDo: change this with a users photos
    const photos = await getPhotoFromDBWithId();

    const tagCounts = {};


    photos.forEach(photo => {
        photo.tags.forEach(tag => {

            const tagTitle = tag.title;
            if (tagCounts[tagTitle]) {
                tagCounts[tagTitle]++;
            } else {
                tagCounts[tagTitle] = 1;
            }
        });
    });

    return tagCounts;
}

export default countTagsInPhotos;