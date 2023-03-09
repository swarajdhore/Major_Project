from flask import Flask, render_template, jsonify
from flask import request
import numpy as np 
import pandas as pd
import tensorflow as tf
import os
import pickle
import json
import jsonpickle
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
dotenv_path = './.env'
load_dotenv(dotenv_path)

df_old = pickle.load(open('./src/flask/pricepreddf.pkl','rb'))
df = pickle.load(open('./src/flask/pricepreddf2.pkl','rb'))
model  = tf.keras.models.load_model("./src/flask/car_price.model")
app=Flask(__name__,template_folder = "./src/flask")
# host_id = os.environ.get('HOST_ID')
CORS(app,resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['CORS_HEADERS'] = 'Content-Type'


col = df_old.columns.values
col1 = col[:31]





@app.route("/predict_price", methods=["POST"])
@cross_origin()
def predict_price():
#********************data Creation**********************

    input_data = request.json.get('input_data')
    car = input_data['car']
    year = input_data['year']
    sp = input_data['sellPrice']
    km = input_data['km_driven']
    fuel = input_data['fuel']
    transmission = input_data['transmission']
    owner = input_data['owner']
    mileage = input_data['mileage']
    power = input_data['max_power']
    seats = input_data['seats']
    temp =[]
    search = 'name_'+car

    for i in range (0,31):
        if( col1[i] == search):
            temp.append(1)
        else:
            temp.append(0)

    newdf = pd.DataFrame([temp], columns=col1)


    data_temp = [ {
             'seller_type_Dealer':0,
             'seller_type_Individual':1,
             'seller_type_Trustmark Dealer':0,
             'year': year, 
             'km_driven':km,
             'fuel':fuel,
             'transmission' : transmission,
             'owner' : owner,
             'mileage': mileage,
             'engine': 1498,
             'max_power': power,
             'seats': seats,
              }]

    data_temp2 = pd.DataFrame(data_temp)
    df2 = pd.concat([data_temp2,df])

#*************************************************************
#*******Normalization*****************************************

    scaler = StandardScaler()
    scaled_num = scaler.fit_transform(df2)
    scaled_num_df = pd.DataFrame(scaled_num, columns=df2.columns)
    data_temp_new = scaled_num_df

#**************************************************************
    data_temp_new = data_temp_new[:1:]
    
    
    data1 = pd.concat([newdf,data_temp_new] , axis =1)

    prediction = model.predict(data1)
    prediction = prediction.astype(int)
    num = prediction[0]
    num2 = num[0]
    num1 = int(num2)
    num = json.dumps(num1)
    output_data = {"result":[num]}
    #response.headers.add('Access-Control-Allow-Origin', '*')
    # return render_template('result2.html', data = num2)
    return jsonify(output_data)

if __name__ == '__main__':
    app.run(host='localhost',debug=True, port=5000)