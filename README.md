Rick & Morty → HubSpot Integration

This project consumes data from the Rick and Morty API and synchronizes it as contacts into HubSpot, applying data transformation, batching, and clean architecture practices.

---

Description

This application implements a full data pipeline:

1. Fetches characters from the Rick & Morty API
2. Builds an episode map (episodeId → episodeName)
3. Transforms the data into HubSpot contact format
4. Splits data into batches
5. Sends contacts to HubSpot CRM

---

Architecture

The project follows a clear separation of concerns:

```
src/
│
├── pipelines/        # Flow orchestration
├── services/         # External API integrations
│   ├── hubspot/
│   └── rickmorty/
├── transformer/      # Data transformation layer
├── utils/            # Helper functions
```

Main flow:

```
Rick & Morty API
        ↓
getRickMortyCharacters
        ↓
getEpisodesMap
        ↓
transformCharacterToHubspot
        ↓
chunkArray
        ↓
sendBatchToHubspot
```

---

Installation

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

---

Environment Variables

Create a `.env` file in the root directory:

```env
HUBSPOT_TOKEN=your_private_app_token
```

Important: Never commit your token to the repository.

---

Usage

```bash
node src/index.js
```

---

Features

Character Fetching

Retrieves all characters from the external API.

Episode Mapping

Builds a dictionary of episode IDs to episode names to avoid redundant API calls.

Data Transformation

Maps character data into the format required by HubSpot contacts.

Batch Processing

Splits large datasets into manageable chunks for efficient API requests.

HubSpot Integration

Sends contact data using the batch API endpoint.

---

Key Concepts

* Batch Processing: Prevents API overload and improves performance
* Separation of Concerns: Each layer has a single responsibility
* Data Mapping: Translates external API data into CRM-compatible format
* Error Handling: Handles API limits and request failures

---

Known Considerations

* HubSpot properties must match exactly (case-sensitive)
* Multi-select fields (like episodes) must be sent as `;` separated strings
* API rate limits may require retry logic or delays

---

Possible Improvements

* Add retry strategy with exponential backoff
* Implement logging system (e.g., Winston)
* Add validation layer before sending data
* Improve performance by reducing API calls further
* Add unit and integration tests

---

License

This project is for educational purposes.

---

Author

Developed as part of a technical training project integrating external APIs with HubSpot.
