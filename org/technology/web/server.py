from flask import Flask
from time import sleep
import json

world = json.load(open("world.json"))["result"]
app = Flask(__name__)



@app.route("/")
def index():
    return """<script src=static/index.js defer></script>
              <link rel='stylesheet' href='static/style.css' defer></script>
              <label>Country Number or Name:<input id=num value='69'></label>
              <button id=go>Go</button>
              <div id=target></div>"""
              

@app.route("/country/<int:i>")
def country(i):
    if i == 42:
        sleep(5)
    return world[int(i)]

@app.route("/country/<string:name>")
def countryByName(name):
    for country in world:
        if country['name'] == name:
            return country
    return

if __name__=="__main__":
    app.run(host='0.0.0.0',port=8080,debug=True)