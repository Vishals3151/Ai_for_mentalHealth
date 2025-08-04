# app.py
import streamlit as st
import joblib
from preprocess import clean_text

# Load model
model = joblib.load("model/emotion_model.pkl")

# Mapping from numeric prediction to emotion label
label_map = {
    0: 'negative',
    1: 'positive',
    2: 'neutral',
}

# Streamlit UI
st.title("🧠 Mental Health Emotion Classifier")
st.write("Enter a message and get the predicted sentiment/emotion.")

# User input
user_input = st.text_input("How are you feeling today?")

# Make prediction if input is given
if user_input:
    clean_input = clean_text(user_input)
    prediction = model.predict([clean_input])[0]
    
    # Convert numeric prediction to label
    readable = label_map.get(prediction, "Unknown")
    
    st.success(f"💬 Predicted Emotion: **{readable}**")
