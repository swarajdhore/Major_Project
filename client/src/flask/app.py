# recommendation 
from flask import Flask, render_template, jsonify
from flask import request
import numpy as np 
import pandas as pd
from sklearn.neighbors import NearestNeighbors
import os
import pickle
import jsonpickle
from flask_cors import CORS, cross_origin

# from dotenv import load_dotenv
# dotenv_path = './.env'
# load_dotenv(dotenv_path)

df_new = pickle.load(open('./src/flask/df_new.pkl','rb'))
app=Flask(__name__,template_folder= "./src/flask")
# host_id = os.environ.get('HOST_ID')
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# app = Flask(__name__)


@app.route("/")
def index():
    return "Hello"


@app.route("/process_data", methods=["POST"])
@cross_origin()
def process_data():

    input_data = request.json.get('input_data')
    year = input_data['year']
    sp = input_data['sellPrice']
    km = input_data['km_driven']
    fuel = input_data['fuel']
    transmission = input_data['transmission']
    owner = input_data['owner']
    mileage = input_data['mileage']
    power = input_data['max_power']
    seats = input_data['seats']
    data = [ {
             'id':0,
             'year': year, 
             'km_driven':km,
             'fuel':fuel,
             'transmission' : transmission,
             'owner' : owner,
             'mileage': mileage,
             'engine': 1498,
             'power': power,
             'seats': seats,
             'selling_price': sp }]
    test = pd.DataFrame(data)
    
    

    knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
    knn.fit(df_new)
    distances, indices = knn.kneighbors(test.iloc[0,:].values.reshape(1, -1), n_neighbors = 11)

    
    res2 = []
    for i in range(0, len(distances.flatten())):
        if i == 0:
            continue
        else:
            res2.append(df_new.index[indices.flatten()[i]])
    
    output_data = {"result":[res2[0],res2[1],res2[2],res2[3],res2[4],res2[5],res2[6],res2[7],res2[8],res2[9]] }
    # response.headers.add('Access-Control-Allow-Origin', '*')
    # return render_template('result.html', data = dict )
    return jsonify(output_data)
    

if __name__ == '__main__':
    app.run(host='localhost',debug=True, port=4000)