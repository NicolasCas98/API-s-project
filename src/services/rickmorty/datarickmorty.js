import axios from "axios";
import { retry } from "../../utils/retry.js";

/**
 * Fetches all characters from the Rick & Morty API
 * Handles pagination automatically
 *
 * @returns {Promise<Array>}
 */

const BASE_URL = "https://rickandmortyapi.com/api/character";

export const getRickMortyCharacters = async () => {

  let nextUrl = BASE_URL;

  const characters = [];

  while (nextUrl) {

    const response = await retry(() => axios.get(nextUrl));

    const data = response.data;

    characters.push(...data.results);

    nextUrl = data?.info?.next;

  }

  return characters;

};