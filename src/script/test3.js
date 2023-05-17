const https = require('https');
const fs = require('fs');
const zlib = require('zlib');
const csv2json = require("csv2json")

function download(url, inputPath, callback) {
    
    const stream = fs.createWriteStream(inputPath, {flag: 'w'})
    https.get(url, (res) => {
        const unzippedStream = res.pipe(zlib.createGunzip())
        const filestream = unzippedStream.pipe(stream)
    })

    let counter = 0
    counter++
    let iterations = 7
    if (counter === iterations) {
      stream.on("finish", () => {
          callback()
      })

    }
      

    stream.on("finish", () => {
      console.log("unzipped files done downloading")
    })




    stream.on("error", (error) => {
        console.log(error)
    })
}



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
    writer.on('finish', () => {
      console.log("finished conversion")
    })
  }



  async function uploadDataToAtlas() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      
      let object = {

      }
      // Specify the collection and database names
      const databaseName = 'FlickFinder';
      const collectionName = "info";
  
      // Read and process the TSV files
      const tsvFiles = [ 
      '/home/risaia/FlickFinder/src/model/imdb_data/name.basics.tsv',
      '/home/risaia/FlickFinder/src/model/imdb_data/title.akas.tsv',
      '/home/risaia/FlickFinder/src/model/imdb_data/title.basics.tsv' , // where the files will be after being uploaded
      '/home/risaia/FlickFinder/src/model/imdb_data/title.crew.tsv' ,
      '/home/risaia/FlickFinder/src/model/imdb_data/title.episode.tsv' ,
      '/home/risaia/FlickFinder/src/model/imdb_data/title.principals.tsv' ,
      '/home/risaia/FlickFinder/src/model/imdb_data/title.ratings.tsv'
      ]
      for (const tsvFile of tsvFiles) {
        const data = fs.readFileSync(tsvFile, 'utf-8');
        const rows = data.split('\n');
  
        const documents = [];
        const header = rows[0].split('\t');
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i].split('\t');
          if (row.length === header.length) {
            const document = {};
            for (let j = 0; j < header.length; j++) {
              document[header[j]] = row[j];
            }
            documents.push(document);
          }
        }
  
        // Insert the documents into MongoDB Atlas
        const collection = client.db(databaseName).collection(collectionName);
        await collection.insertMany(documents);
      }
  
      console.log('Data uploaded successfully to MongoDB Atlas');
    } catch (error) {
      console.error('Error uploading data to MongoDB Atlas', error);
    } finally {
      // Close the MongoDB Atlas connection
      await client.close();
    }
  }


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
    let path = "/home/risaia/FlickFinder/src/model/imdb_data/" + name.replace(".gz", "")
    let outputPath = path.replace(".tsv", ".json")
    download(url, path, () => {
        console.log("loop testing")
    })
}