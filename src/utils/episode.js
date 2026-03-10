import axios from "axios";

/**
 * Build a map of episodeId -> episodeName
 */

export const getEpisodesMap = async (characters) => {

  const episodeIds = new Set();
  
  for (const character of characters) {

    for (const url of character.episode) {

      const id = url.split("/").pop();

      episodeIds.add(id);

    }

  }

  const idsArray = [...episodeIds];
  const episodesMap = {};

  for (let i = 0; i < idsArray.length; i += 20) {

    const batch = idsArray.slice(i, i + 20);

    const url = `https://rickandmortyapi.com/api/episode/${batch.join(",")}`;

    const response = await axios.get(url);

    const data = response.data;

    if (Array.isArray(data)) {

      data.forEach(ep => {

        episodesMap[ep.id] = ep.name;

      });

    } else {

      episodesMap[data.id] = data.name;

    }

  }

  return episodesMap;

};

/**
 * Convert character episode URLs to episode names
 */

export const mapCharacterEpisodes = (character, episodeMap) => {

  return character.episode
    .map(url => {

      const id = url.split("/").pop();

      return episodeMap[id];

    })
    .filter(Boolean)
    .join(";");

};