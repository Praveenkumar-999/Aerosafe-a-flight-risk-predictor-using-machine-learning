# Aerosafe

**Aerosafe** is a web-based flight risk analysis tool that predicts flight safety levels using machine learning.  
This project combines data ingestion, ML model training, and a dashboard to help airline operators and analysts assess risk in real time.

## 🚀 What it does

- Uses flight and sensor data to predict risk scores (low/medium/high).
- Includes a CNN model (`cnn_model.h5`) for automated risk classification.
- Provides REST API (`cnn_api.py`) for model inference.
- Frontend interfaces for dashboard and report generation in `public/`.

## 🗂️ Repository structure

- `cnn_api.py` — inference API endpoint (TensorFlow/Keras model load + prediction).
- `train_model.py` — dataset processing + model training pipeline.
- `weather_dataset.csv` — sample data used for training.
- `server.js`, `routes/`, `controllers/` — backend for user and risk queries.
- `public/` — web UI (dashboard, risk analysis, ternary plots).
- `model/`, `models/` — Mongoose models for users, results, etc.
- `db.js` — MongoDB connection setup.

## 🛠️ Technologies

- Python (TensorFlow/Keras, pandas, numpy)
- Node.js + Express
- MongoDB / Mongoose
- HTML/CSS/JS (dashboard + data visualization)

## 📦 Setup

1. Clone:
   ```bash
   git clone https://github.com/Praveenkumar-999/Aerosafe-a-flight-risk-predictor-using-machine-learning.git
   cd "aero - Copy - Copy"
2.python env:
   python -m venv aerosafe-env
   .\aerosafe-env\Scripts\activate
  pip install -r requirements.txt
3.Node:
   npm install
4.start maongodb database:
   install mongodb compass
5.next steps run in powershell:
   mkdir C:\data\db
   mondod
6.run training model:
   python train_model.py
7.run model api:
   python cnn_api.py
8.node createUser.js
9.node server.js
