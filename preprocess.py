# preprocess.py
import pandas as pd
import re

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

def load_sentiment_data(path='data/sentiment_analysis.csv'):
    df = pd.read_csv(path)
    df = df.dropna()
    df['text'] = df['text'].apply(clean_text)
    return df[['text', 'label']]

def load_mental_health_conversations(path='data/mental_health_conversations.csv'):
    df = pd.read_csv(path)
    df = df.dropna(subset=['user', 'assistant'])
    df['user'] = df['user'].apply(clean_text)
    df['assistant'] = df['assistant'].apply(clean_text)
    return df[['user', 'assistant']]

def load_mental_health_comprehensive(path='data/mental_health_comprehensive.csv'):
    df = pd.read_csv(path)
    text_cols = [col for col in df.columns if df[col].dtype == 'object']
    for col in text_cols:
        df[col] = df[col].apply(lambda x: clean_text(x) if isinstance(x, str) else x)
    return df

def load_conversations_training(path='data/conversations_training.csv'):
    df = pd.read_csv(path)
    df = df.dropna(subset=['input', 'response'])
    df['input'] = df['input'].apply(clean_text)
    df['response'] = df['response'].apply(clean_text)
    return df[['input', 'response']]

def load_dialogues_training(path='data/dialogues_training.csv'):
    df = pd.read_csv(path)
    df = df.dropna()
    df['dialogue'] = df['dialogue'].apply(clean_text)
    return df[['dialogue']]

def load_all_data():
    return {
        "sentiment": load_sentiment_data(),
        "mental_health_conversations": load_mental_health_conversations(),
        "mental_health_comprehensive": load_mental_health_comprehensive(),
        "conversations_training": load_conversations_training(),
        "dialogues_training": load_dialogues_training(),
    }
