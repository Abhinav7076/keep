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
// app.use(express.json());

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
    const note = {
        title: "CBDC",
        subject: "economics",
        content: `
        Why in News?
        Recently, the Reserve Bank of India (RBI) Governor has highlighted the potential of Central Bank Digital Currency (CBDC) or E-rupee in improving cross-border payments' efficiency.
        
        RBI is gradually expanding its CBDC pilots to include more banks, cities, diverse use cases, and a broader audience.
        The RBI launched pilots for digital rupee in the wholesale in November 2022 and in the retail segment in December 2022.
        What is Central Bank Digital Currency (CBDC)?
        About:
        CBDCs are a digital form of a paper currency and unlike cryptocurrencies that operate in a regulatory vacuum, these are legal tenders issued and backed by a central bank.
        It is the same as a fiat currency and is exchangeable one-to-one with the fiat currency.
        A fiat currency is a national currency that is not pegged to the price of a commodity such as gold or silver.
        The digital fiat currency or CBDC can be transacted using wallets backed by blockchain.
        Though the concept of CBDCs was directly inspired by Bitcoin, it is different from decentralised virtual currencies and crypto assets, which are not issued by the state and lack the ‘legal tender’ status.
        Objectives:
        The main objective is to mitigate the risks and trim costs in handling physical currency, costs of phasing out soiled notes, transportation, insurance and logistics.
        It will also wean people away from cryptocurrencies as a means for money transfer.
        Global Trends:
        Bahamas has been the first economy to launch its nationwide CBDC — Sand Dollar in 2020.
        Nigeria is another country to have roll out eNaira in 2020.
        China became the world's first major economy to pilot a digital currency e-CNY in April 2020.
        
        What is the Significance of CBDC?
        Cross-Border Transactions:
        CBDCs possess unique attributes that can revolutionize cross-border transactions.
        Instant settlement feature of CBDCs as a significant advantage, making cross-border payments cheaper, faster, and more secure.
        Faster, cheaper, transparent, and inclusive cross-border payment services can yield substantial benefits for individuals and economies worldwide. These improvements can support economic growth, international trade, and financial inclusion on a global scale.
        Traditional and Innovative:
        CBDC can gradually bring a cultural shift towards virtual currency by reducing currency handling costs.
        CBDC is envisaged to bring in the best of both worlds:
        The convenience and security of digital forms like cryptocurrencies
        The regulated, reserved-backed money circulation of the traditional banking system.
        Financial Inclusion:
        The increased use of CBDC could be explored for many other financial activities to push the informal economy into the formal zone to ensure better tax and regulatory compliance.
        It can also pave the way for furthering financial inclusion.
        What are the Challenges in Adopting CBDC Across India?
        Privacy Concerns:
        The first issue to tackle is the heightened risk to the privacy of users—given that the central bank could potentially end up handling an enormous amount of data regarding user transactions.
        This has serious implications given that digital currencies will not offer users the level of privacy and anonymity offered by transacting in cash.
        Compromise of credentials is another major issue.
        Disintermediation of Banks:
        If sufficiently large and broad-based, the shift to CBDC can impinge upon the bank’s ability to plough back funds into credit intermediation.
        If e-cash becomes popular and the Reserve Bank of India (RBI) places no limit on the amount that can be stored in mobile wallets, weaker banks may struggle to retain low-cost deposits.
        Other Risks are:
        Faster obsolescence of technology could pose a threat to the CBDC ecosystem calling for higher costs of upgradation.
        Operational risks of intermediaries as the staff will have to be retrained and groomed to work in the CBDC environment.
        Elevated cyber security risks, vulnerability testing and the costs of protecting the firewalls.
        Operational burden and costs for the central bank in managing CBDC.
        Way Forward
        Central banks should continue their efforts to research, develop, and pilot CBDCs. Collaboration with financial institutions, technology experts, and other stakeholders is essential to ensure the successful implementation of CBDCs.
        Central banks and financial authorities from different countries should collaborate closely on CBDC initiatives. Cross-border payments inherently involve multiple jurisdictions, so international cooperation is vital to address regulatory, security, and technical challenges.
        CBDCs must prioritize security and privacy. Robust cybersecurity measures should be in place to protect against hacking and fraud. Simultaneously, mechanisms for ensuring user privacy and data protection should be established and maintained.`
    };

    note["starting_letter"] = note.title[0].toUpperCase()

    const database = client.db('keep_db');
    const keep = database.collection(note.subject);
    
    const result = await keep.insertOne(note);
    res.status(201).json({ message: 'note inserted', id: result.insertedId });
    try {
        
    } catch (err) {
        res.status(500).json({ message: 'Failed to insert note', error: err });
    }
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
        const results = await client.db(dbName).collection(subject).find({}).toArray();
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
        const cursor = client.db(dbName).collection(subject).find({ starting_letter });
        // Convert the cursor to an array of documents
        const results = await cursor.toArray();

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: 'No documents found' });
        }
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
        
        const cursor = client.db(dbName).collection(subject).find({ title: titleRegex });
        const results = await cursor.toArray();

        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: 'No documents found' });
        }
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
