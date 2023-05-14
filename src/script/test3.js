const https = require('https');
const fs = require('fs');
const zlib = require('zlib');

function download(url, inputPath) {
    const stream = fs.createWriteStream(inputPath)
    https.get(url, (res) => {
        const unzippedStream = res.pipe(zlib.createGunzip())
        const filestream = unzippedStream.pipe(stream)
    })

    stream.on("finish", () => {
        console.log("unzipped files done downloading")
    })

    stream.on("error", (error) => {
        console.log(error)
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
    download(url, path)
}