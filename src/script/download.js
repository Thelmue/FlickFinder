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




const input = "src/model/data/imdb_data/title.basics.tsv"
const output = "src/model/data/imdb_data/title.basics.json"
let docs = [{test: "Tangle"}, {test: "Tangle"}]


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



const datasets = [
    "http://datasets.imdbws.com/name.basics.tsv.gz", 
    "http://datasets.imdbws.com/title.akas.tsv.gz", 
    "http://datasets.imdbws.com/title.basics.tsv.gz", 
    "http://datasets.imdbws.com/title.crew.tsv.gz", 
    "http://datasets.imdbws.com/title.episode.tsv.gz", 
    "http://datasets.imdbws.com/title.principals.tsv.gz", 
    "http://datasets.imdbws.com/title.ratings.tsv.gz"
]


for (let i of datasets) {
    console.log(datasets[i])
}


















// async function run() {
    
//     let x = await dbFindOne(query)
//     console.log(x)
// }

// run()

// dbUpdate(query).catch(console.error())



/*


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


