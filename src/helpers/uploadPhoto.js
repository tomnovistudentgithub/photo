function uploadPhoto(username, photoFile) {

    if (!['image/jpeg', 'image/png'].includes(photoFile.type)) {
        console.error('Invalid file type. Please upload a JPEG or PNG file.');
        return "Invalid file type. Please upload a JPEG or PNG file.";
    } else {
        const formData = new FormData();
        formData.append("file", photoFile);
        console.log(formData);
        return formData;
    }

}

export default uploadPhoto;