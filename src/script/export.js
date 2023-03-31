const fs = require("fs")
const { MongoClient } = require("mongodb");
require('dotenv').config()
const csv2json = require("csv2json")
const zlib = require("zlib")
const https = require("https");
const decompress = require("decompress")
const { response } = require("express");
const events = require("events")
const util = require("util")
let myEmitter = new events.EventEmitter()




function tsv2json(input, output) {
    let options = {
        encoding: "utf-8",
        highWaterMark: 16
    }
    const reader = fs.createReadStream(input, options)
    const writer = fs.createWriteStream(output, options)
    reader.pipe(
        csv2json({separator: "\t"}, { objectMode:true })
    ).on("data", (chunk) => {console.log(chunk.toString())}).pipe(writer)
}

// -------------------------------------------

async function dbFindOne(query) {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    
    try {
      await client.connect()
      const database = client.db("FlickFinder");
      const movies = database.collection('basic_info');
  
      // Query for a movie that has the title 'Back to the Future'
      const query = this.query
      const movie = await movies.findOne(query);
  
      
      return movie
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close(); 
    }
  }


// -------------------------------------------

async function dbUpdate(docs) {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  
  try {
    await client.connect()
    const database = client.db("FlickFinder");
    const movies = database.collection('basic_info');

    // Query for a movie that has the title 'Back to the Future'
    // const movie = await movies.insertMany(docs);
    const movie = await movies.insertMany(docs)
    

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close(); 
  }
}

// -------------------------------------------

function downloader(url, path) {
  const file = fs.createWriteStream(path);
  return new Promise((resolve, reject) => {
    const request = https.get(url, function(res) {
      res.pipe(file);
      file.on("finish", () => {    
        // console.log(res)
        console.log("Downloaded")
      })
      file.on("error", () => {
        console.log(error)
      })
    });
  })


} 


function unzip(gzipFilePath, outputFilePath) {
  const gzipStream = fs.createReadStream(gzipFilePath);
  const unzipStream = zlib.createGunzip();
  const outputStream = fs.createWriteStream(outputFilePath);

  return new Promise((resolve, reject) => {
    gzipStream.on('error', reject);
    unzipStream.on('error', reject);
    outputStream.on('error', reject);

    outputStream.on('finish', () => {
      resolve();
    });

    gzipStream.pipe(unzipStream).pipe(outputStream);
  });
}



module.exports = { tsv2json, dbFindOne, dbUpdate, downloader, unzip }




