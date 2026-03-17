import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
import joblib

data = pd.read_csv("weather_dataset.csv")

X = data[['temperature','humidity','wind_speed','cloud_cover','precipitation','pressure']]
y = data['risk_level']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = tf.keras.Sequential([

tf.keras.layers.Reshape((6,1),input_shape=(6,)),

tf.keras.layers.Conv1D(32,2,activation='relu'),

tf.keras.layers.Conv1D(64,2,activation='relu'),

tf.keras.layers.Flatten(),

tf.keras.layers.Dense(64,activation='relu'),

tf.keras.layers.Dense(3,activation='softmax')

])

model.compile(
optimizer='adam',
loss='sparse_categorical_crossentropy',
metrics=['accuracy']
)

model.fit(X_scaled,y,epochs=30)

model.save("cnn_model.h5")

print("CNN model trained")