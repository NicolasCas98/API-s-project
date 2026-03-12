import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const HUBSPOT_URL = "https://api.hubapi.com/crm/v3/objects/contacts/batch/create";

const headers = {
  Authorization: `Bearer ${process.env.HUBSPOT_TOKEN}`,
  "Content-Type": "application/json"
};

/**
 * Send contacts in batch to HubSpot
 * @param {Array} contacts
 */

export const sendBatchToHubspot = async (contacts) => {

  try {

    const response = await axios.post(
      HUBSPOT_URL,
      {
        inputs: contacts
      },
      { headers }
    );

    return response.data;

  } catch (error) {

    console.error(
      "HubSpot batch error:",
      error?.response?.data || error.message
    );

    throw error;

  }

};