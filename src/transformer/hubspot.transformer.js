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

export const transformCharacterToHubspot = (character, episodes) => {

  const nameParts = character.name.split(" ");

  const firstname = nameParts[0] || "";
  const lastname = nameParts.slice(1).join(" ") || "";

  const episodeCount = character.episode?.length || 0;

  const age = episodeCount >= 20 ? "Older" : "Young";

  const rawContact = {

    firstname,
    lastname,

    gender_ch: character.gender,
    species: character.species,
    type: character.type || "Unknown",

    status: character.status,

    id_character: character.id,

    origin_name: character.origin?.name || "",
    location_name: character.location?.name || "",

    image: character.image,

    age,

    episode: episodes

  };

  const filteredContact = {};

  for (const key of allowedProperties) {

    if (rawContact[key] !== undefined) {

      filteredContact[key] = rawContact[key];

    }

  }


  Object.keys(filteredContact).forEach(key => {

    if (filteredContact[key] === "" || filteredContact[key] === null) {

      delete filteredContact[key];

    }

  });

  return filteredContact;

};