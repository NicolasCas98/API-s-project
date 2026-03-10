import * as rickmorty from './services/rickmorty/datarickmorty.js';
import * as transformer from './transformer/hubspot.transformer.js';
import * as hubspot from './services/hubspot/datahubspot.js';
import * as utils from './utils/chunk.js';
import * as episodes from './utils/episode.js';

const BATCH_SIZE = 100;

const main = async () => {

  try {

    console.log("Fetching characters...");

    const characters = await rickmorty.getRickMortyCharacters();

    console.log(`Total characters: ${characters.length}`);

    console.log("Fetching episode names...");

    const episodeMap = await episodes.getEpisodesMap(characters);

    console.log("Transforming characters...");

    const contacts = characters.map(character => {

      const episodeNames = episodes.mapCharacterEpisodes(character, episodeMap);

      return transformer.transformCharacterToHubspot(character, episodeNames);

    });

    const batches = utils.chunkArray(contacts, BATCH_SIZE);

    console.log(`Sending ${contacts.length} contacts in ${batches.length} batches`);

    for (const batch of batches) {

      await hubspot.sendBatchToHubspot(batch);

      console.log(`Batch sent: ${batch.length} contacts`);

    }

    console.log("Process completed successfully");

  } catch (error) {

    if (error.response?.status === 402) {

      console.error(
        "HubSpot contact limit reached (1000 contacts). Delete some contacts and retry."
      );

      return;

    }

    console.error("Process failed:", error.message);

  }

};

main();