from flask import Flask, render_template, jsonify
from flask import request
import numpy as np 
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
import os
import pickle
import jsonpickle
from flask_cors import CORS, cross_origin
import json

# from dotenv import load_dotenv
# dotenv_path = './.env'
# load_dotenv(dotenv_path)

df_new = pickle.load(open('./src/flask/df_new-1.pkl','rb'))
app=Flask(__name__,template_folder= "./src/flask")
# host_id = os.environ.get('HOST_ID')
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# app = Flask(__name__)


@app.route("/")
def index():
    return "Hello More Than Hello"



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

    # input_data = request.json.get('input_data')
    # year = 2018
    # sp = 200000
    # km = 20000
    # fuel = 2
    # transmission = 1
    # owner = 2
    # mileage = 12
    # power = 100
    # seats = 4
    
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
    # test2 = pd.concat([test,df_new])
    
    
    # scaler = StandardScaler()
    # scaled_num = scaler.fit_transform(test2)
    # scaled_num_df = pd.DataFrame(scaled_num, columns=test2.columns)
    # test3= scaled_num_df
    
    knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
    knn.fit(df_new)
    distances, indices = knn.kneighbors(test.iloc[0,:].values.reshape(1, -1), n_neighbors = 13)

    
    res2 = []
    for i in range(0, len(distances.flatten())):
        if i == 0:
            continue
        else:
            res2.append(df_new.index[indices.flatten()[i]])
    
    dict2 = {}
    keys = []
    values = []
    for i in range(1,12):
        keys.append(df_new.index[indices.flatten()[i]])
        values.append(df_new.iloc[indices.flatten()[i]])
    for i in range(len(keys)):
        dict2[keys[i]] = values[i]

    # print(dict2)

    tempx2 = pd.DataFrame.from_dict(dict2)
    tempx2 = tempx2.T.reset_index().T
    # output_dict = {"result1" : [keys[0]]}
    new_tempx2 = tempx2.to_json() 
    final_dictionary = json.loads(new_tempx2)
    #print(type(new_tempx2))
    #key_dict= {"result": [keys[0],keys[1],keys[2],keys[3],keys[4],keys[5],keys[6],keys[7],keys[8],keys[9],keys[10]] }

    # return {"result": [dict2[keys[0]],dict2[keys[1]],dict2[keys[2]],dict2[keys[3]],dict2[keys[4]],dict2[keys[5]],dict2[keys[6]],dict2[keys[7]],dict2[keys[8]],dict2[keys[9]],dict2[keys[10]]] }
    # return '{"result": '+ new_tempx2 + '}'
    return {"result": final_dictionary}
    # return render_template('result.html', data = dict2, data1  = key_dict )
    # print(key_dict)
    # key_dict.headers.add('Access-Control-Allow-Origin', '*')
    # return '{"result":['+ dict2[keys[0]]+','+dict2[keys[1]]+','+dict2[keys[2]]+','+dict2[keys[3]]+','+dict2[keys[4]]+','+dict2[keys[5]]+','+dict2[keys[6]]+','+dict2[keys[7]]+','+dict2[keys[8]]+','+dict2[keys[9]]+','+dict2[keys[10]]+']}'
    # return '{"result": "'+ "Hello" + '"}'
    # return jsonify({"result":["Hello","Hi"]})
    # return jsonify({"result":["Hello"]})



    # output_data = {"result":[res2[0],res2[1],res2[2],res2[3],res2[4],res2[5],res2[6],res2[7],res2[8],res2[9], res2[10], res2[11]]}
    # return render_template('result.html', data = dict )
    # return jsonify(output_data)

    # knn = NearestNeighbors(metric = 'cosine', algorithm = 'brute')
    # knn.fit(scaled_num_df)
    # distances, indices = knn.kneighbors(test3.iloc[0,:].values.reshape(1, -1), n_neighbors = 11)

    
    # res2 = []
    # for i in range(0, len(distances.flatten())):
    #     if i == 0:
    #         continue
    #     else:
    #         res2.append(df_new.index[indices.flatten()[i]])
    # output_data = {"result":[res2[0],res2[1],res2[2],res2[3],res2[4],res2[5],res2[6],res2[7],res2[8],res2[9]] }
    # # return render_template('result.html', data = dict, data1  = (res2[4]+".png") )
    # return jsonify(output_data)

# process_data()    

if __name__ == '__main__':
    app.run(host='localhost',debug=True, port=4000)