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
}

let str = '/home/risaia/FlickFinder/src/model/imdb_data/name.basics.tsv'
console.log(str.split("/"))