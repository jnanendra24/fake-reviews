from flask import Flask, request, jsonify
from flask_cors import CORS
from features import calculate_features, encode_category, extract_roberta_features, scale_features
import numpy as np
from joblib import load
import nltk

nltk.download("stopwords")
nltk.download("vader_lexicon")

model1 = load('kaggle.joblib')
model1.set_params(device = 'cpu')

model2 = load('combined.joblib')
model2.set_params(device = 'cpu')

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return "Fake Reviews Detector"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    review_text = data['review_text']
    rating = int(data['rating'])
    product_category = data['product_category']
    model_name = data['model']

    
    newFeatures = calculate_features(review_text)
    product_category = encode_category(product_category)

    X_meta = np.hstack((product_category, np.array([rating]), newFeatures)).reshape(1, -1)
    X_meta = scale_features(X_meta)
    X_roberta = extract_roberta_features(review_text)

    X = np.hstack((X_roberta, X_meta))
    
    model = model1 if model_name == 'kaggle' else model2
    prediction = model.predict_proba(X)[0].tolist()
    return jsonify({'prediction': f'Fake: {prediction[0]:.5f}\nReal: { prediction[1]:.5f}'})

if __name__ == '__main__':
    app.run(port=5000, debug=True)