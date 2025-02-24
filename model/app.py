from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for testing

# Load dataset
try:
    df_selected = pd.read_csv("Crops_data.csv", encoding="latin1")
    df_selected.columns = df_selected.columns.str.strip()  # Remove spaces in column names
    df_selected["State Name"] = df_selected["State Name"].str.strip().str.lower()  # Normalize state names
    
    # Extract yield-related columns
    crop_columns = [col for col in df_selected.columns if "yield" in col.lower()]
    
    print("✅ Dataset loaded successfully!")
    print("🛠 DEBUG: First few rows of dataset:")
    print(df_selected.head())
    
    print("🛠 DEBUG: Selected Crop Columns:")
    print(crop_columns)

except Exception as e:
    print(f"❌ Error loading dataset: {e}")

@app.route('/predict', methods=['POST'])
def predict_crop():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400
        
        state_name = data.get("state_name", "").strip().lower()

        if not state_name:
            return jsonify({"error": "State name is required"}), 400

        print(f"📌 Received request for state: {state_name}")

        # Check if state exists in dataset
        matching_rows = df_selected[df_selected["State Name"] == state_name]
        print(f"🛠 DEBUG: Found {len(matching_rows)} rows for state: {state_name}")

        if matching_rows.empty:
            print("❌ State not found in dataset!")
            return jsonify({"error": "State not found in dataset"}), 404

        # Keep only numeric crop data
        crop_data = matching_rows[crop_columns]
        
        print("🛠 DEBUG: Raw Crop Data for the selected state:")
        print(crop_data)

        # Handle NaN values (drop columns where all values are NaN)
        crop_data_clean = crop_data.dropna(axis=1, how='all')  # Remove crops with all NaN values
        
        if crop_data_clean.empty:
            print("❌ No valid crop data found for this state.")
            return jsonify({"error": "No valid crop data found for this state"}), 500

        # Find the crop with the highest average yield
        best_crop_column = crop_data_clean.mean().idxmax()
        max_value = crop_data_clean.mean().max()

        # Clean the crop name
        best_crop_name = best_crop_column.replace("YIELD (Kg per ha)", "").strip()

        print("🛠 DEBUG: Final Processed Crop Data:")
        print(crop_data_clean)

        print(f"🔍 Best Crop: {best_crop_name} with Yield: {max_value}\n")

        return jsonify({"recommended_crop": best_crop_name, "score": max_value})

    except Exception as e:
        print("❌ Error in /predict:", str(e))
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
