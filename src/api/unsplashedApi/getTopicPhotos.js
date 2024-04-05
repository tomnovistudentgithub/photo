import unsplashedEndpoint from './unsplashedEndpoint.js';

export async function getTopicPhotos(topicId, itemsPerPage) {
    const response = await unsplashedEndpoint.get(`/topics/${topicId}/photos?per_page=${itemsPerPage}`);
    if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("response.data getTopicPhotos: ", response.data)
    const data = await response.data;

    return data.slice(1);
}