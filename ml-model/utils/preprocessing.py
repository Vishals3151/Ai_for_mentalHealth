import pandas as pd

def load_and_preprocess(file_path, text_col="text", label_col="label"):
    df = pd.read_csv(file_path, low_memory=False)

    # Drop rows where text or label is missing
    df = df.dropna(subset=[text_col, label_col])

    # Convert labels to string (avoid mixed types)
    df[label_col] = df[label_col].astype(str).str.strip()

    return df[text_col], df[label_col]
