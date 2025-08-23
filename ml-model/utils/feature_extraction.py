from sklearn.feature_extraction.text import TfidfVectorizer

def get_vectorizer():
    """Return a TF-IDF vectorizer"""
    return TfidfVectorizer(max_features=5000, ngram_range=(1,2))
