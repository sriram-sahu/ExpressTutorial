const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const url = "mongodb://127.0.0.1:27017";
const dbName = "userDb";
const collectionName = "userDetails";

// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const userId = req.params.id;
    const updateFields = req.body;

    const result = await collection.updateOne(
      { _id: ObjectId(userId) }, // Filter by the user's ID
      { $set: updateFields } // Update the specified fields
    );

    if (result.modifiedCount === 1) {
      res.json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
