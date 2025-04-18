# MongoDB Data Migration

A simple Express-based application to migrate data from one MongoDB collection to another with an option to drop the source collection after a successful migration.

**Created by IfeCodes**

## Features

- **Data Migration:** Copy documents from a specified source collection to a target collection (`users`).
- **Optional Cleanup:** Drop the source collection post-migration when the `dropSource` parameter is set to `true` (as a boolean or string).
- **REST API:** Built with Express.js, providing a single endpoint for migration.
- **CORS Support:** Configured to allow all origins for easier testing.

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd MongoDb-Data-Migration
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**

   ```bash
   npm start
   ```

   The application will start on port 3000.

## Usage

Send a `POST` request to the root endpoint (`/`) with a JSON payload. The required parameters are:

- `uri`: Your MongoDB connection URI.
- `sourceDbName`: The database name of the source.
- `targetDbName`: The database name of the target.
- `sourceCollectionName`: The name of the source collection.
- `dropSource`: (Optional) Set to `true` (or `"true"`) if you want the source collection dropped after migration. Defaults to `false`.

### Example Request Using cURL

```bash
curl -X POST http://localhost:3000/ \
-H "Content-Type: application/json" \
-d '{
    "uri": "mongodb://localhost:27017",
    "sourceDbName": "mySourceDb",
    "targetDbName": "myTargetDb",
    "sourceCollectionName": "mySourceCollection",
    "dropSource": true
}'
```

## Error Handling

- **400 Bad Request:** Returned if any required migration parameter is missing.
- **404 Not Found:** Returned if no documents are found in the source collection.
- **500 Internal Server Error:** Returned if the migration process fails, with error details in the response.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes.

## License

ISC
