# train.py
import joblib
import nltk
from nltk.tokenize import word_tokenize
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from preprocess import load_sentiment_data

# Download NLTK tokenizer data (only first time)
nltk.download('punkt')

# Load data
df = load_sentiment_data()
X = df['text']
y = df['label']

# ✅ Step 1: Tokenization (explicit)
print("🔍 Tokenizing text data...")
X_tokenized = X.apply(lambda text: word_tokenize(text))  # List of tokens for each text

# ✅ Step 2: Join tokens back for TF-IDF
# (TF-IDF expects strings, so we join token lists with spaces)
X_tokenized_str = X_tokenized.apply(lambda tokens: " ".join(tokens))

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_tokenized_str, y, test_size=0.2, random_state=42)

# ✅ Step 3: Pipeline: TF-IDF + Naive Bayes
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=5000)),
    ('clf', MultinomialNB())
])

# Train
pipeline.fit(X_train, y_train)

# Evaluate
y_pred = pipeline.predict(X_test)
print("\n📊 Classification Report:\n", classification_report(y_test, y_pred))

# Save model
joblib.dump(pipeline, 'model/emotion_model.pkl')
print("✅ Model saved to model/emotion_model.pkl")
