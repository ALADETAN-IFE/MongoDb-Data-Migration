const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { MongoClient } = require("mongodb");

const corsOptions = {
  origin: "*", // Allow all origins for testing; adjust as needed for production
};
app.use(cors(corsOptions));
app.use(express.json());

app.post("/", async (req, res) => {
    // Default dropSource to false if not provided.
    const { uri, sourceDbName, targetDbName, sourceCollectionName, dropSource = false } = req.body;
    if (!uri || !sourceDbName || !targetDbName || !sourceCollectionName) {
        return res.status(400).json({ error: "Missing required migration parameters." });
    }
  
    // Normalize dropSource (convert string "true"/"false" to boolean if needed)
    const shouldDrop = dropSource === true || dropSource === "true";
  
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
        await client.connect();

        const sourceDb = client.db(sourceDbName);
        const targetDb = client.db(targetDbName);
      
        // Fetch documents from the source collection
        const documents = await sourceDb.collection(sourceCollectionName).find().toArray();
      
        if (documents.length > 0) {
            // Insert the documents into the target collection ("users")
            const result = await targetDb.collection("users").insertMany(documents, { ordered: false });
            console.log(`${result.insertedCount} users migrated successfully.`);
            
            // Optionally drop the source collection if instructed
            if (shouldDrop) {
                console.log(`Deleting old data from ${sourceCollectionName}...`);
                await sourceDb.collection(sourceCollectionName).drop();
            }
            return res.status(200).json({ message: `${result.insertedCount} users migrated successfully.` });
        } else {
            console.log("No users found to migrate.");
            return res.status(404).json({ message: "No users found to migrate." });
        }
    } catch (err) {
        console.error("Migration failed:", err);
        return res.status(500).json({ error: "Migration failed.", details: err.message });
    } finally {
        await client.close();
    }
});
  
app.listen(port, () => console.log(`Migration app listening on port ${port}!`));