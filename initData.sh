#!/bin/bash

curl -i -X POST -d 'name=Paris&weather=sunny&temperature=20' https://calm-atoll-4981.herokuapp.com/cities
curl -i -X POST -d 'name=London&weather=rainy&temperature=9' https://calm-atoll-4981.herokuapp.com/cities
curl -i -X POST -d 'name=Moscow&weather=cold&temperature=-19' https://calm-atoll-4981.herokuapp.com/cities
curl -i -X POST -d 'name=Frankfurt&weather=cloudy&temperature=15' https://calm-atoll-4981.herokuapp.com/cities
