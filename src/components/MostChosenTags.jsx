import {useState} from "react";

function MostChosenTags({tagCounts}) {

    console.log(tagCounts);

    const chosenTags = tagCounts && Object.entries(tagCounts)
        .filter(([tag, count]) => count > 3);

    return (
        <div>
            <h4>Style of chosen photos</h4>
            {chosenTags.length > 0 ? (
                <ul>
                    {chosenTags.map(([tag, count]) => (
                        <li key={tag}>{tag}: {count}</li>
                    ))}
                </ul>
            ) : (
                <p>A minimum of 4 tags is required to determine a style.</p>
            )}
        </div>
    );
}

export default MostChosenTags;