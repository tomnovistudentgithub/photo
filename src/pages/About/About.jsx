import React, {useEffect, useState} from 'react';
import './About.modules.css';
import useTagCounts from "../../helpers/useTagCounts.js";
import useGetPhotoFromDBWithId from "../../api/getPhotoFromDBWithId.js";
import countTagsInPhotos from "../../helpers/countTagsInPhotos.js";
import PhotoCard from "../../components/PhotoCard/PhotoCard.jsx";



function About() {


    return (

        <div className={"about-container"}>

            <h1> ...Ever wondered... </h1>
            <h3> how you or your family would look like on those amazing photos you see on the internet</h3>
            <p>This page aims to bring you in touch with top notch photographers from your surroundings.
                By picking your favorite photo's we'll determine the best photographer you can hire closeby.
            </p>
            <p>To do this we make use of Photographers data on Unsplashed.
            </p>


        </div>
    );
}

export default About;