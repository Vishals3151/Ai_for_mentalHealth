from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from utils.preprocessing import load_and_preprocess
from utils.feature_extraction import get_vectorizer
from utils.model_utils import save_model, evaluate_model

DATA_PATH = "training/data/raw/mental_health_conversations.csv"
MODEL_PATH = "models/mood_predictor.pkl"

X, y = load_and_preprocess(DATA_PATH, text_col="question", label_col="status")


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

pipeline = Pipeline([
    ("tfidf", get_vectorizer()),
    ("clf", MultinomialNB())
])

pipeline.fit(X_train, y_train)
evaluate_model(pipeline, X_test, y_test)

save_model(pipeline, MODEL_PATH)
