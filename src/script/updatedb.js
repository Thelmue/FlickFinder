const { tsv2json, dbFindOne, dbUpdate, downloader, unzipGzipFile } = require("./export.js")
const https = require('https');
const fs = require('fs');
const zlib = require('zlib');
const path = require("path")






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
  let path = "/workspaces/flickfinder.net/src/model/data/imdb_data/" + name
  let bool = fs.existsSync(path)
  if (bool === true) {
    console.log("File Already Exists")
    return "File Already Exists"
  } else {
    downloader(url, path)
  }
  
  // tsv2json(path, path.replace(".tsv", ".json"))
}




