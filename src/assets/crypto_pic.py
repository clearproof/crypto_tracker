import json
import requests
import os

def coin_pics():

    url = 'https://www.cryptocompare.com/api/data/coinlist/'

    resp = requests.get(url=url)
    data = json.loads(resp.text).get("Data")

    for coin in data:
        crypto_url = "https://www.cryptocompare.com"

        try:
            end_url = data[coin]["ImageUrl"]
            full_url = crypto_url + end_url
            path = "pics/" + coin + '.png'
            os.system("wget -O {0} {1}".format(path, full_url))

        except KeyError:
            pass


coin_pics()