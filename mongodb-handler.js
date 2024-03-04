const { MongoClient } = require('mongodb');
require("dotenv").config()
const uri = process.env.MONGODB_URI;

async function insertData(collectionName, data) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const collection = client.db("sheets-idealidad").collection(collectionName);
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documentos fueron insertados`);
        return result;
    } finally {
        await client.close();
    }
}

module.exports = {
    insertData
};
