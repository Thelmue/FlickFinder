
const fs = require("fs")
const { MongoClient } = require("mongodb");
require('dotenv').config()
const csv2json = require("csv2json")
const zlib = require("zlib")
const https = require("https");
const decompress = require("decompress")
const { response } = require("express");
const events = require("events")
const util = require("util");
const { resolve } = require("path");
const { rejects } = require("assert");


function downloadUnzip(url, filename, outputDirectory, callback) {
  // Download the file using HTTPS
  const request = https.get(url, (response) => {
    // Create a write stream to save the downloaded file
    const fileStream = fs.createWriteStream(filename);

    // Pipe the response from the HTTP request to the file stream
    response.pipe(fileStream);

    // When the download is complete, extract the file
    fileStream.on('finish', () => {
      // Create a read stream for the downloaded file
      const readStream = fs.createReadStream(filename);

      // Create a write stream for the output file
      const writeStream = fs.createWriteStream(outputDirectory);

      // Create a gunzip stream to extract the file
      const gunzip = zlib.createGunzip();

      // Pipe the read stream through the gunzip stream to the write stream
      readStream.pipe(gunzip).pipe(writeStream);

      // When the extraction is complete, call the callback function
      writeStream.on('finish', () => {
        callback("finsihed");
      });
    });
  });

  // Handle any errors that occur during the download
  request.on('error', (error) => {
    console.error(`Error downloading file: ${error}`);
  });
}


//-----------------------------------------------------------------


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


//-----------------------------------------------------------------



function tsv2json(input, output, callback) {
  let options = {
      encoding: "utf-8",
      highWaterMark: 16
  }
  const reader = fs.createReadStream(input, options)
  const writer = fs.createWriteStream(output, options)
  reader.pipe(
      csv2json({separator: "\t"}, { objectMode:true })
  ).on("data", (chunk) => {console.log(chunk.toString())}).pipe(writer)
  writer.on('finish', () => {
    callback("finished")
  })
}


//-----------------------------------------------------------------

const datasets = [
    "https://datasets.imdbws.com/name.basics.tsv.gz", 
    "https://datasets.imdbws.com/title.akas.tsv.gz", 
    "https://datasets.imdbws.com/title.basics.tsv.gz", 
    "https://datasets.imdbws.com/title.crew.tsv.gz", 
    "https://datasets.imdbws.com/title.episode.tsv.gz", 
    "https://datasets.imdbws.com/title.principals.tsv.gz", 
    "https://datasets.imdbws.com/title.ratings.tsv.gz"
]



for (let i in datasets) {
    let url = datasets[i]
    let name = url.split('/')[3] // splitting the url by "/",choosing the fouth value in the array 
    let path = "src/model/data/imdb_data/" + name
    let outputPath =  path.replace('.gz', '')
    downloadUnzip(url, path, outputPath, () => {
      let Path = outputPath.replace('.tsv', '.json')
      tsv2json(outputPath, Path, () => {
        console.log("finally")
        fs.unlink(outputPath, (error) => {
          if (error) {
            console.error("Error is: " + error)
          } else {
            console.log("deleted files")
          }
    
        })
        fs.unlink(outputPath + '.gz', (error) => {
          if (error) {
            console.error("Error is: " + error)
          } else {
            console.log("deleted files")
          }
    
        })
    })

    })
}













// tsv2json(input, output)
// let query = [{test: "Tangled"}]

// async function run() {
    
//     let x = await dbFindOne(query)
//     console.log(x)
// }

// run()

// dbUpdate(query).catch(console.error())



/*
const datasets = [
    "http://datasets.imdbws.com/name.basics.tsv.gz", 
    "http://datasets.imdbws.com/title.akas.tsv.gz", 
    "http://datasets.imdbws.com/title.basics.tsv.gz", 
    "http://datasets.imdbws.com/title.crew.tsv.gz", 
    "http://datasets.imdbws.com/title.episode.tsv.gz", 
    "http://datasets.imdbws.com/title.principals.tsv.gz", 
    "http://datasets.imdbws.com/title.ratings.tsv.gz"
]

const names = [
    "name.basics.tsv.gz",
    "title.akas.tsv.gz", 
    "title.basics.tsv.gz", 
    "title.crew.tsv.gz", 
    "title.episode.tsv.gz", 
    "title.principals.tsv.gz", 
    "title.ratings.tsv.gz"
]
*/

// for (let i of datasets) {
//     console.log(datasets[2])
// }


