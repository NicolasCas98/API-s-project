/**
 * Transform Rick & Morty chatacters into HubSpot contact format.
 * Age category is estimated based on episode appearances.
 * 
 * @param {Array} chatacters
 * @returns {Array}
 */

export const transformDates = (chatacters) => {
    return chatacters.map((chatacter) => {
        const episodeCount = chatacter.episode.length;

        const ageCategory = episodeCount > 20 ? "mayor" : "joven";

        return{
            
        }
    })
}