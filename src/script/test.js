
const { tsv2json, dbFindOne, dbUpdate } = require("./export.js")
const input = "/workspaces/flickfinder.net/src/model/data/imdb_data/title.basics.tsv"
const output = "/workspaces/flickfinder.net/src/model/data/imdb_data/title.basics.json"
let docs = [{test: "Tangle"}, {test: "Tangle"}]

tsv2json(input, output)
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


