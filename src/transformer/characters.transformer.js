/**
 * Estimate age category based on number of episodes
 * @param {number} episodeCount
 * @returns {string}
 */
const classifyAge = (episodeCount) => {

  if (episodeCount >= 20) return "older";

  return "young";

};

/**
 * Transform characters to a format ready for external systems
 * @param {Array} characters
 * @returns {Array}
 */
export const transformCharacters = (characters) => {

  return characters.map((character) => {

    const episodeCount = character.episode?.length || 0;

    const ageCategory = classifyAge(episodeCount);

    return {

      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      origin: character.origin?.name || null,

      episodeCount,
      ageCategory,

    };

  });

};