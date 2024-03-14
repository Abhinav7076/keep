require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aps:1234@cluster0.agdg9yv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
dbName="keep_db"
collectionName="keep"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
    try {
      await client.connect();
      console.log("Connected successfully to MongoDB");
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
    }
  }

connectToMongoDB().catch(console.dir);

// Use CORS middleware to allow requests from any origin
app.use(cors());
app.use(express.json());

// MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.log(err));

// // Define a Note model
// const Note = mongoose.model('Note', new mongoose.Schema({
//     title: String,
//     content: String,
// }));

app.get('/', (req, res) => {
    res.status(200).send("Hello world2")
})

app.post('/keep', async (req, res) => {
    const note = req.body;
    console.log("payload",note)

    note["starting_letter"] = note.title[0].toUpperCase()

    const database = client.db('keep_db');
    const keep = database.collection(note.subject.toLowerCase());
    
    const result = await keep.insertOne(note);
    res.status(201).json({ message: 'note inserted', id: result.insertedId });
    // try {
        
    // } catch (err) {
    //     res.status(500).json({ message: 'Failed to insert note', error: err });
    // }
});

// // Get all keep
// app.get('/keep', async (req, res) => {
//     try {
//         const results = await client.db(dbName).collection(collectionName).find({}).toArray();
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).send({ message: err.message });
//     }
// });

// Get all economics content
app.get('/keep/:subject', async (req, res) => {
    try {
        const { subject } = req.params
        const results = await client.db(dbName).collection(subject).find({}).sort({ title: 1 }).toArray();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// (find by starting letter)
app.get('/keep/:subject/:starting_letter', async (req, res) => {
    try {
        const { subject, starting_letter } = req.params;
        console.log(subject, starting_letter)
        // Using find to get all documents that match the starting_letter criteria
        const cursor = client.db(dbName).collection(subject).find({ starting_letter }).sort({ title: 1 });
        // Convert the cursor to an array of documents
        const results = await cursor.toArray();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Failed to find user', error: err });
    }
});


// search by title
app.get('/keep/search/:subject/:title', async (req, res) => {
    try {
        const { subject, title } = req.params;
        // Create a case-insensitive regular expression to match a substring in the title
        const titleRegex = new RegExp(title, 'i');
        
        const cursor = client.db(dbName).collection(subject).find({ title: titleRegex }).sort({ title: 1 });
        const results = await cursor.toArray();

        res.status(200).json(results);
        // if (results.length > 0) {
        //     res.status(200).json(results);
        // } else {
        //     res.status(404).json({ message: 'No documents found' });
        // }
    } catch (err) {
        res.status(500).json({ message: 'Failed to find user', error: err });
    }
});

// app.put('/keep/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const userData = req.body;
//         const result = await client.db(dbName).collection(collectionName).updateOne({ _id: new MongoClient.ObjectID(id) }, { $set: userData });
//         res.status(200).send({ message: "User updated" });
//     } catch (err) {
//         res.status(500).send({ message: err.message });
//     }
// });

// app.delete('/keep/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const result = await client.db(dbName).collection(collectionName).deleteOne({ _id: new MongoClient.ObjectID(id) });
//         if (result.deletedCount === 1) {
//             res.status(200).send({ message: "User deleted" });
//         } else {
//             res.status(404).send({ message: "User not found" });
//         }
//     } catch (err) {
//         res.status(500).send({ message: err.message });
//     }
// });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
