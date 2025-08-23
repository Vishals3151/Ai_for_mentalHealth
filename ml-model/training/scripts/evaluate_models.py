from utils.model_utils import load_model
from utils.preprocessing import load_and_preprocess


models = {
    "emotion": ("models/emotion_classifier.pkl", "training/data/raw/mental_health_comprehensive.csv", "text", "label"),
    "mood": ("models/mood_predictor.pkl", "training/data/raw/mental_health_conversations.csv", "question", "status"),
    "conversation": ("models/conversation_model.pkl", "training/data/raw/conversations_training.csv", "input", "output"),
    "recommendation": ("models/recommendation_model.pkl", "training/data/raw/dialogues_training.csv", "text", "emotion"),
    "sentiment": ("models/sentiment_model.pkl", "training/data/raw/sentiment_analysis.csv", "text", "label")
}

for name, (model_path, data_path, text_col, label_col) in models.items():
    print(f"\n==== Evaluating {name} model ====")
    model = load_model(model_path)
    X, y = load_and_preprocess(data_path, text_col=text_col, label_col=label_col)
    preds = model.predict(X[:10])  # quick sanity check
    for i, p in enumerate(preds):
        print(f"Sample {i+1}: Predicted = {p}, Actual = {y.iloc[i]}")
