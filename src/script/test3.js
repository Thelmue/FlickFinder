const https = require('https');
const fs = require('fs');
const zlib = require('zlib');
const csv2json = require("csv2json")

function download(url, inputPath, callback) {
    const stream = fs.createWriteStream(inputPath)
    https.get(url, (res) => {
        const unzippedStream = res.pipe(zlib.createGunzip())
        const filestream = unzippedStream.pipe(stream)
    })

    stream.on("finish", () => {
        console.log("unzipped files done downloading")
        callback()
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
        tsv2json(path, outputPath)
    })
}