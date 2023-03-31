import polars as pl
import numpy as np
import pandas as pd


title_basic = pl.read_csv("/workspaces/flickfinder.net/src/model/data/imdb_data/data/title.basics.tsv")

print(title_basic.to_string())


