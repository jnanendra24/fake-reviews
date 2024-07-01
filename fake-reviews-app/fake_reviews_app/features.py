import numpy as np
import pandas as pd
import joblib
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.corpus import stopwords
import torch
import string
from spellchecker import SpellChecker
from transformers import RobertaTokenizer, RobertaModel


stop_words = set(stopwords.words('english'))
tokenizer = RobertaTokenizer.from_pretrained('roberta-base')
model = RobertaModel.from_pretrained('roberta-base')
scaler = joblib.load('scaler_roberta_new.pkl')
labelEncoder = joblib.load('labelencoder.pkl')

# Function to count errors in a single review
def count_errors(text):
    spell = SpellChecker()
    if pd.isna(text):
        return 0
    words = text.split()
    misspelled = spell.unknown(words)
    return len(misspelled)

def calculate_features(review_text):
    sid = SentimentIntensityAnalyzer()
    features = {
        'type_errors': count_errors(review_text),
        'review_length': len(review_text),
        'num_words': len(review_text.split()),
        'avg_word_length': np.mean([len(word) for word in review_text.split()]) if len(review_text.split()) > 0 else 0,
        'num_unique_words': len(set(review_text.split())),
        'num_stop_words': len([word for word in review_text.split() if word in stop_words]),
        'punctuation_count': sum(1 for char in review_text if char in string.punctuation),
        'sentiment_score': sid.polarity_scores(review_text)['compound'],
    }
    return np.array(list(features.values()))

def scale_features(features):
    return scaler.transform(features.reshape(1, -1))

def encode_category(product_category):
    return labelEncoder.transform([product_category])

def extract_roberta_features(review_text):
    inputs = tokenizer(review_text, return_tensors='pt', truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    return np.array(outputs.last_hidden_state[:, 0, :].numpy())