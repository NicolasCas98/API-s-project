import * as rickmorty from "../services/rickmorty/datarickmorty.js";
import * as transformer from "../transformer/hubspot.transformer.js";
import * as hubspot from "../services/hubspot/datahubspot.js";
import * as utils from "../utils/chunk.js";
import { getEpisodesMap } from "../utils/episode.js";

const BATCH_SIZE = 100;

export const runCharacterSync = async () => {

  console.log("Fetching characters...");

  const characters = await rickmorty.getRickMortyCharacters();

  console.log(`Characters fetched: ${characters.length}`);

  console.log("Fetching episodes...");

  const episodesMap = await getEpisodesMap(characters);

  console.log("Episodes map created");

  const contacts = characters.map(character =>
    transformer.transformCharacterToHubspot(character, episodesMap)
  );

  const batches = utils.chunkArray(contacts, BATCH_SIZE);

  console.log(`Sending ${contacts.length} contacts in ${batches.length} batches`);

  for (const batch of batches) {

    await hubspot.sendBatchToHubspot(batch);

    console.log(`Batch sent: ${batch.length} contacts`);

  }

  console.log("Process completed successfully");

};