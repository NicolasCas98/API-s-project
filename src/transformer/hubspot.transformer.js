import { mapCharacterEpisodes } from "../utils/episode.js";

const allowedProperties = [
  "firstname",
  "lastname",
  "gender_ch",
  "species",
  "type",
  "origin_name",
  "location_name",
  "age",
  "status",
  "id_character",
  "image",
  "episode"
];

/**
 * Transform Rick & Morty character to HubSpot contact
 */

export const transformCharacterToHubspot = (character, episodeMap) => {

  const [firstname, ...rest] = character.name.split(" ");
  const lastname = rest.join(" ");

  const episodes = mapCharacterEpisodes(character, episodeMap);

  const age = character.episode.length > 20 ? "Older" : "Young";

  return {
    properties: {
      firstname: String(firstname || ""),
      lastname: String(lastname || ""),
      gender_ch: String(character.gender || ""),
      species: String(character.species || ""),
      type: String(character.type || ""),
      origin_name: String(character.origin?.name || ""),
      location_name: String(character.location?.name || ""),
      episode: String(episodes || ""),
      age: String(age),
      status: String(character.status || ""),
      id_character: String(character.id || ""),
      image: String(character.image || "")
    }
  };

};