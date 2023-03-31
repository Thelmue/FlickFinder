const { MongoClient } = require("mongodb");
require('dotenv').config()

// Replace the uri string with your connection string.


async function run() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  
  try {
    await client.connect()
    const database = client.db("FlickFinder");
    const movies = database.collection('basic_info');

    // Query for a movie that has the title 'Back to the Future'
    const query = { test: 'Tangle' };
    const movie = await movies.insertOne(query);
    
    console.log(movie.test);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close(); 
  }
}
run().catch(console.error())

