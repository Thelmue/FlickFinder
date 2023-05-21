const https = require('https');
const fs = require('fs');
const zlib = require('zlib');
const csv2json = require("csv2json")

let input = "/home/risaia/FlickFinder/src/model/imdb_data/title.principals.tsv"
let output = "/home/risaia/FlickFinder/src/model/imdb_data/title.principals.json"

function tsv2json(input, output) {
    let options = {
      encoding: "utf-8",
      highWaterMark: 16
    }
    const reader = fs.createReadStream(input, options)
    const writer = fs.createWriteStream(output, options)
    reader.pipe(
      csv2json({ separator: "\t" }, { objectMode: true })
    ).on("data", (chunk) => { console.log(chunk.toString()) }).pipe(writer)
    writer.on('finish', () => {
      console.log("finished conversion")
    })
}

tsv2json(input, output)