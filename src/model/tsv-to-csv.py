import re
with open("/workspaces/flickfinder.net/src/model/data/imdb_data/data/title.basics.tsv", "r") as tsv:
    with open("/workspaces/flickfinder.net/src/model/data/imdb_data/data/title.basics.csv", "w") as csv:
        for line in tsv:
                content =  line.replace("\t", ",")
                content = line.replace(',', " ")
                
            csv.write(content)


print(content)

