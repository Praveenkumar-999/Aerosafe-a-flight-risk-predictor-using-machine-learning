
from flask import Flask,request,jsonify
import tensorflow as tf
import numpy as np

app = Flask(__name__)

model = tf.keras.models.load_model("cnn_model.h5")

@app.route("/predict",methods=["POST"])
def predict():

    data = request.json

    features = np.array([[

        data["temperature"],
        data["humidity"],
        data["wind"],
        data["cloud"],
        data["rain"],
        data["pressure"]

    ]])

    prediction = model.predict(features)

    labels=["LOW","MEDIUM","HIGH"]

    risk_index = np.argmax(prediction)

    return jsonify({
        "risk":labels[risk_index],
        "confidence":float(np.max(prediction))
    })

app.run(port=6000)