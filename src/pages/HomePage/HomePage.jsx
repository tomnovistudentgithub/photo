import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getPhotos } from '../../api/unsplashedApi/getPhotos.js';
import { getTopics } from '../../api/unsplashedApi/getTopics.js';
import './HomePage.modules.css';
import PhotoCard from "../../components/PhotoCard/PhotoCard.jsx";
import {usePhotos} from "../../hooks/usePhotos.js";
import {useTopics} from "../../hooks/useTopics.js";
import PhotoPinner from "../../components/PhotoPinner/PhotoPinner.jsx";
import PinnedPhotosContext from "../../contexts/PinnedPhotoContext.js";

function HomePage() {
    const { photos, isLoading: photosLoading } = usePhotos();
    const { topics, isLoading: topicsLoading } = useTopics();
    const { pinnedPhotos, pinPhoto } = useContext(PinnedPhotosContext);


    useEffect(() => {

    }, [pinnedPhotos]);



    if (photosLoading || topicsLoading) {
        return <div>Loading...</div>;
    }



    //Todo: add a loading spinner while the data is being fetched
    //todo: state management en useEffect verhuizen naar custom hook directories,
    // herbruikbaar en compacter
    // useEffect(() => {
    //     const fetchPhotos = async () => {
    //         try {
    //             const photoData = await getPhotos();
    //             setPhotos(photoData);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error(error);
    //             setIsLoading(false);
    //         }
    //     };
    //     const fetchTopics = async () => {
    //         try {
    //             const topicData = await getTopics(1, 8);
    //             setTopics(topicData);
    //             setIsLoading(false);
    //         } catch (error) {
    //             console.error(error);
    //             setIsLoading(false);
    //         }
    //     };
    //
    //     fetchPhotos();
    //     fetchTopics();
    // }, []);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="outer-section-homepage">
            <div className="header-container">
            <h2>Photo topics</h2>
            <div className="juststyle"></div>
            </div>

            <section className="outer-section-topics">

                {topics.map((topic) => (
                    <div className="topic" key={topic.id}>
                        {topic.cover_photo &&
                            <img src={topic.cover_photo.urls.small} alt={topic.cover_photo.alt_description}/>}
                        <Link to={`/topic/${topic.id}`}>
                            <h3>{topic.title}</h3>
                        </Link>
                        <p>{topic.description}</p>
                    </div>
                ))}

            </section>
            <section className="outer-section-photos">
                <h2>Photos</h2>
                {photos.map((photo) => (
                    <div key={photo.id}>
                        <PhotoCard photo={photo}/>
                        <PhotoPinner photo={photo}/>
                    </div>
                ))}
            </section>
        </div>

    );


}

export default HomePage;