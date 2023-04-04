#!/usr/bin/env python
# coding: utf-8

# In[6]:


import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import pickle
import numpy as np

from keras.models import load_model
import json
import random

from flask import Flask, request, jsonify

from flask_cors import CORS, cross_origin

# app = Flask(__name__)
words = pickle.load(open('./src/flask/words.pkl','rb'))
model = load_model('./src/flask/chatbot_model.h5')
intents = json.loads(open('./src/flask/intents.json').read())
classes = pickle.load(open('./src/flask/classes.pkl','rb'))

app=Flask(__name__,template_folder= "./src/flask")
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['CORS_HEADERS'] = 'Content-Type'


# In[7]:


def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

# return bag of words array: 0 or 1 for each word in the bag that exists in the sentence

def bow(sentence, words, show_details=True):
    # tokenize the pattern
    sentence_words = clean_up_sentence(sentence)
    # bag of words - matrix of N words, vocabulary matrix
    bag = [0]*len(words)
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s:
                # assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print ("found in bag: %s" % w)
    return(np.array(bag))

def predict_class(sentence, model):
    # filter out predictions below a threshold
    p = bow(sentence, words,show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i,r] for i,r in enumerate(res) if r>ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def getResponse(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if(i['tag']== tag):
            result = random.choice(i['responses'])
            break
    return result

@app.route("/")
def index():
    return "Hello More Than Hello"

@app.route('/chatbot', methods=['POST'])
@cross_origin(['http://localhost:3000'])
def chatbot_response():
    msg = request.json['message']
    ints = predict_class(msg, model)
    res = getResponse(ints, intents)

    # outputData = {"message" : res}
    return '{"message": "'+ res + '"}'


if __name__ == '__main__':
    app.run(host='localhost',debug=True, port=7000)

# In[8]:


# import tkinter
# from tkinter import *


# # In[9]:


# def send():
#     msg = EntryBox.get("1.0",'end-1c').strip()
#     EntryBox.delete("0.0",END)

#     if msg != '':
#         ChatLog.config(state=NORMAL)
#         ChatLog.insert(END, "You: " + msg + '\n\n')
#         ChatLog.config(foreground="#442265", font=("Verdana", 12 ))

#         res = chatbot_response(msg)
#         ChatLog.insert(END, "Bot: " + res + '\n\n')

#         ChatLog.config(state=DISABLED)
#         ChatLog.yview(END)


# # In[10]:


# base = Tk()
# base.title("Chat Bot")
# base.geometry("400x500")
# base.resizable(width=FALSE, height=FALSE)
# ChatLog = Text(base, bd=0, bg="white", height="8", width="50", font="Arial",)

# ChatLog.config(state=DISABLED)
# scrollbar = Scrollbar(base, command=ChatLog.yview, cursor="heart")
# ChatLog['yscrollcommand'] = scrollbar.set
# SendButton = Button(base, font=("Verdana",12,'bold'), text="Send", width="12", height=5,
#                     bd=0, bg="#32de97", activebackground="#3c9d9b",fg='#ffffff',
#                     command= send )
# EntryBox = Text(base, bd=0, bg="white",width="29", height="5", font="Arial")
# scrollbar.place(x=376,y=6, height=386)
# ChatLog.place(x=6,y=6, height=386, width=370)
# EntryBox.place(x=128, y=401, height=90, width=265)
# SendButton.place(x=6, y=401, height=90)
# base.mainloop()


# In[ ]:





# In[ ]:




