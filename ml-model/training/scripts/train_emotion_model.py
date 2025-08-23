import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from utils.preprocessing import load_and_preprocess
from utils.feature_extraction import get_vectorizer
from utils.model_utils import save_model, evaluate_model

DATA_PATH = "training/data/raw/mental_health_comprehensive.csv"
MODEL_PATH = "models/emotion_classifier.pkl"

X, y = load_and_preprocess(DATA_PATH, text_col="text", label_col="label")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

pipeline = Pipeline([
    ("tfidf", get_vectorizer()),
    ("clf", LogisticRegression(max_iter=200))
])

pipeline.fit(X_train, y_train)
evaluate_model(pipeline, X_test, y_test)

save_model(pipeline, MODEL_PATH)
