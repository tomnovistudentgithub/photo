import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import './Contact.modules.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular, faUserCircle, faMessage} from '@fortawesome/free-regular-svg-icons';
import getUserRoleEmail from "../../api/noviBackendApi/getUserRoleEmail.js";
import uploadPhoto from "../../helpers/uploadPhoto.js";
import uploadPhotoToApi from "../../api/noviBackendApi/uploadPhotoToApi.js";




function Contact() {
    const { register, handleSubmit,setValue, getValues, formState: { errors } } = useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [username, setUsername] = useState('');
    const [errorPhotoUpload, setErrorPhotoUpload] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            console.log('fetchUserData is being called');
            try {
                const response = await getUserRoleEmail();
                console.log('Response from API getUserRole:', response);
                if (response) {

                    setValue('userName', `${response.username}`);
                    setUsername(`${response.username}`);
                    setValue('email', `${response.email}`);
                }
            } catch (error) {
                console.log('There was a problem with the API call:', error);
            }
        };
        fetchUserData();
    }, [setValue]);


    const onSubmit = async data => {
        const photoFile = data.photoUpload[0];
        const formData = uploadPhoto(username, photoFile);

        if (typeof result === 'string') {
            setErrorPhotoUpload(formData);
            } else {
            const response = await uploadPhotoToApi(username, formData);
            if (response && response.status === 200) {
                setFormData({
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    photoUpload: photoFile.name
                });
                setIsModalOpen(true);
            }
        }
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="parent-form-wrapper">
        <div className="form-wrapper">


            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Contact</h1>
                <p>Want to get in touch with a photographer of your choice? You are at the right place!</p>

                <div className="input-label">
                    <FontAwesomeIcon icon={faUser}/>
                    <input {...register("name", {required: true})} placeholder="Name"/>
                    {errors.name && <p>This field is required</p>}
                </div>
                <div className="input-label">
                    <FontAwesomeIcon icon={faUserCircle}/>
                    <input {...register("userName", {required: false})}
                           placeholder="Username"
                           disabled={!!username}
                    />
                </div>

                {errors.userName && <p>error</p>}
                <div className="input-label">
                    <FontAwesomeIcon icon={faEnvelope}/>
                    <label>E-mail:</label>
                    <input {...register("email", {required: true})} placeholder="Email"/>
                </div>
                {errors.email && <p>This field is required</p>}

                <div className="input-label">
                    <FontAwesomeIcon icon={faMessage}/>
                    <textarea {...register("message", {required: true})} placeholder="Message"/>
                    {errors.message && <p>This field is required</p>}
                </div>
                <div className="input-label">
                    <FontAwesomeIcon icon={faCamera}/>

                    <input type="file" {...register("photoUpload", {required: false})} />
                    <label>JPG or PNG</label>
                    {errorPhotoUpload && <p>{errorPhotoUpload}</p>}
                </div>
                {errors.photo && <p>This field is required</p>}

                <input type="submit"/>
            </form>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Thank you for your submission, we'll get back to you!</h3>
                        <p>Your submission:</p>
                    <p>Name: {formData.name}</p>
                    <p>Email: {formData.email}</p>
                    <p>Message: {formData.message}</p>
                    <button className="modalButton" onClick={closeModal}></button>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}
export default Contact;