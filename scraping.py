from bs4 import BeautifulSoup
import requests as rq
import urllib3 as ul

# fetch = ul

imdb_html = rq.get("https://www.imdb.com/list/ls066660185/?sort=list_order,asc&st_dt=&mode=detail&page=1")

html_text = imdb_html.text

print(html_text)

