import useTagCounts from "../helpers/useTagCounts.js";
import photographers from "../assets/photographers.json";

function MatchPhotoGrapherToUserByTags() {
    const tagCounts = useTagCounts();

    // Get the user's most chosen tags
    const userTags = Object.keys(tagCounts);

    // Filter the photographers whose skills match the user's most chosen tags
    const matchingPhotographers = photographers.filter(photographer =>
        photographer.skills.some(skill => userTags.includes(skill))
    );

    return (
        <div>
            {matchingPhotographers.map(photographer => (
                <div key={photographer.id}>
                    <h2>{photographer.name}</h2>
                    <p>{photographer.bio}</p>
                    <p>Skills: {photographer.skills.join(", ")}</p>
                </div>
            ))}
        </div>
    );
}

export default matchPhotoGrapherToUserByTags;
