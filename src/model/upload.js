const fs = require("fs")
const { MongoClient } = require("mongodb");
require('dotenv').config()



async function dbUpdate(docs) {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
  
    
    try {
      await client.connect()
      const database = client.db("FlickFinder");
      const movies = database.collection('info');
  
      // Query for a movie that has the title 'Back to the Future'
      // const movie = await movies.insertMany(docs);
      const movie = await movies.insertMany(docs)
      
  
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close(); 
    }
}

docs = [{"movie": "tangled"}]
dbUpdate(docs)