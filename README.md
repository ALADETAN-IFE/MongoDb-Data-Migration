# MongoDB Data Migration

A simple Express-based application to migrate data from one MongoDB collection to another with an option to drop the source collection after a successful migration.

**Created by IfeCodes**

## Features

- **Data Migration:** Copy documents from a specified source collection to a user-specified target collection.
- **Optional Cleanup:** Drop the source collection post-migration when the `dropSource` parameter is set to `true` (as a boolean or string).
- **REST API:** Built with Express.js, providing a single endpoint for migration.
- **CORS Support:** Configured to allow all origins for easier testing.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ALADETAN-IFE/MongoDb-Data-Migration.git
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
- `targetCollectionName`: The name of the target collection.
- `dropSource`: (Optional) Set to `true` (or `"true"`) if you want the source collection dropped after migration. Defaults to `false`.

### Example Request Using cURL

```bash
curl -X POST http://localhost:3000/ \
-H "Content-Type: application/json" \
-d '{
    "uri": "mongodb+srv://<username>:<password>@cluster0.smtumfc.mongodb.net",
    "sourceDbName": "mySourceDb",
    "targetDbName": "myTargetDb",
    "sourceCollectionName": "mySourceCollection",
    "targetCollectionName": "myTargetCollection",
    "dropSource": true
}'
```

## Error Handling

- **400 Bad Request:** Returned if any required migration parameter is missing.
- **404 Not Found:** Returned if no documents are found in the source collection.
- **500 Internal Server Error:** Returned if the migration process fails, with error details in the response.

## Troubleshooting

- **Missing or Incorrect Parameters:**  
  Ensure that all required parameters (`uri`, `sourceDbName`, `targetDbName`, `sourceCollectionName`, `targetCollectionName`) are included and correctly spelled in your JSON payload.

- **MongoDB Connection Issues:**  
  - Verify that your MongoDB URI is correct.  
  - Check if your MongoDB server is running and accessible.  
  - For MongoDB Atlas, ensure your IP is whitelisted.

- **Duplicate Key Errors:**  
  If you encounter errors like `E11000 duplicate key error`, it indicates there are duplicate `_id` values in your target collection. Consider handling duplicates or cleaning up the data before migration.

- **Network or CORS Issues:**  
  - Confirm that your network allows connections to the MongoDB server.  
  - Although the API uses a permissive CORS policy for testing, check your environment settings if you encounter CORS-related errors.

- **Server Not Running:**  
  - Ensure that all dependencies were correctly installed (`npm install`).  
  - Verify that you are starting the server with `npm start` and that no startup errors are reported in the terminal.

If you continue to experience issues, please open an issue on the repository with detailed information about your environment and error messages.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes.

## License

ISC