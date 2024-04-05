import React, {useEffect, useState} from 'react';
import './About.modules.css';
import countTagsInPhotos from "../../helpers/countTagsInPhotos.js";

function About() {
    const [tagCounts, setTagCounts] = useState(null);

    useEffect(() => {
        async function fetchTagCounts() {
            const counts = await countTagsInPhotos();
            setTagCounts(counts);
        }

        fetchTagCounts();
    }, []);

    console.log(tagCounts);
    return (
        <div className={"about-container"}>
            <h1>  ...Ever wondered...  </h1>
            <h3> how you or your family would look like on those amazing photos you see on the internet</h3>
            <p>This page aims to bring you in touch with top notch photographers from your surroundings.
            By picking your favorite photo's we'll determine the best photographer you can hire closeby.
            </p>


        </div>
    );
}

export default About;