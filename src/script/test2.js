const { tsv2json, dbFindOne, dbUpdate, downloader, unzipGzipFile } = require("./export.js")
const axios = require("axios")
const https = require("https")
const fs = require("fs")
const zlib = require("zlib")
const { error } = require("console")




/*
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
  downloader(url, path)
  console.log(path)  
  downloader(url, path)
  let unzip = path.replace(".gz", "")
  unzipGzipFile(path, unzip)

}
*/
