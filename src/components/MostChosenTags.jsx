import {useState} from "react";

function MostChosenTags({tagCounts}) {

    console.log(tagCounts);

    return (
        <div>
            <h4>Most chosen tags</h4>
            <ul>
                {tagCounts && Object.entries(tagCounts)
                    .filter(([tag, count]) => count > 3)
                    .map(([tag, count]) => (
                        <li key={tag}>{tag}: {count}</li>
                    ))}
            </ul>
        </div>
    );


}

export default MostChosenTags;