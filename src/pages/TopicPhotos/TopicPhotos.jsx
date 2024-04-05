import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import unsplashedEndpoint from '../../api/unsplashedApi/unsplashedEndpoint.js';
import { getTopic } from '../../api/unsplashedApi/getTopic.js';
import { getTopicPhotos } from '../../api/unsplashedApi/getTopicPhotos.js'
import * as styles from './TopicPhotos.modules.css';
function TopicPhotos() {

    //leest parameter uit de URL uit
    const { topicId } = useParams();
    const [topic, setTopic] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [showPhotos, setShowPhotos] = useState(false);

    useEffect(() => {
        // const timer = setTimeout(() => {
            setShowPhotos(true);
        // }, 1000); // 1 seconde delay ingebouwd om de foto's vertraagd te laten zien zodat eerst de achtergrondfoto te zien is
        //TODO checken of dit de correcte opruimactie is voor de timer (controller abort)
        // return () => clearTimeout(timer);


    }, []);

    useEffect(() => {
        const fetchTopic = async () => {
            try {
                const data = await getTopic(topicId);
                setTopic(data);

            } catch (error) {
                console.error(error);
            }


        }

        fetchTopic();
    }, [topicId]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await getTopicPhotos(topicId, 5+1);
                setPhotos(data);
                console.log("photos: ", photos);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPhotos();
    }, [topicId]);

    if (!topic) {
        return <div className="loading">Loading...</div>;
    }



    const coverPhotoUrl = topic.cover_photo.urls.regular;
    console.log("coverPhotoUrl: ", coverPhotoUrl);

    return (
        <div className="topic-photos-wrapper" style={{backgroundImage: `url(${coverPhotoUrl})`}}>
            <div className="overlay">
            <h1>{topic.title}</h1>
            <p>{topic.description}</p>
            </div>
            <div className="photo-grid">
                {showPhotos && photos.map((photo, index) => {


                    const aspectRatio = photo.width / photo.height;
                    let orientation = '';
                    if (aspectRatio > 1) {
                        orientation = 'landscape';
                    } else if (aspectRatio < 1) {
                        orientation = 'portrait';
                    } else {
                        orientation = 'square';
                    }


                    let gridArea = '';
                    // switch (index % 6) {
                    //     case 0:
                    //     case 3:
                    //         gridArea = 'portrait';
                    //         break;
                    //     case 1:
                    //     case 2:
                    //     case 4:
                    //         gridArea = 'landscape';
                    //         break;
                    //     default:
                    //         gridArea = '.';
                    //         break;
                    // }
                    console.log(`Photo ${index + 1} is ${orientation}`);

                    return (
                        <img src={photo.urls.small} alt={photo.alt_description} key={photo.id} style={{gridArea}}/>
                    );
                })}
            </div>
        </div>
    );
}

export default TopicPhotos;