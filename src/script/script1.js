const https = require('https');
const fs = require('fs');
const zlib = require('zlib');

const fileUrl = 'https://example.com/myfile.tar.gz';
const fileName = 'myfile.tar.gz';
function downloader(fileUrl, fileName) {
    https.get(fileUrl, (res) => {
      const gzip = zlib.createGunzip();
      const fileStream = fs.createWriteStream(fileName);
    
      res.pipe(gzip).pipe(fileStream);
    
      fileStream.on('finish', () => {
        console.log('Downloaded and unzipped file successfully');
      });
    }).on('error', (err) => {
      console.error(`Error downloading file: ${err.message}`);
    });

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

for (let i in datasets) {
  let url = datasets[i]
  let name = url.split('/')[3] // splitting the url by "/",choosing the fouth value in the array 
  let path = "src/model/data/imdb_data/" + name
  downloader(url, path)
  
  // tsv2json(path, path.replace(".tsv", ".json"))
}