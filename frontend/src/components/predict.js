import { useState } from "react";
import axios from "axios";

const CropRecommendation = () => {
    const [stateName, setStateName] = useState("");
    const [recommendedCrop, setRecommendedCrop] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/crops/recommend", { state_name: stateName });
            setRecommendedCrop(response.data.recommended_crop);
        } catch (error) {
            console.error("Error:", error);
            setRecommendedCrop("No recommendation available.");
        }
    };
    const handlePredict = async () => {
        const stateName = document.getElementById("stateInput").value;  // Get state name from input
    
        const requestBody = JSON.stringify({ state_name: stateName });
    
        console.log("Sending request:", requestBody);  // Debugging log
    
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody,
        });
    
        const result = await response.json();
        console.log("Prediction result:", result);  // Debugging log
    
        if (response.ok) {
            document.getElementById("output").innerText = `Recommended Crop: ${result.recommended_crop}`;
        } else {
            document.getElementById("output").innerText = `Error: ${result.error}`;
        }
    };
    

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Crop Recommendation</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="Enter State Name"
                    className="border p-2 rounded w-full mt-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2 w-full">
                    Get Recommendation
                </button>
            </form>
            {recommendedCrop && (
                <p className="mt-4 text-lg font-semibold text-green-700">
                    Recommended Crop: {recommendedCrop}
                </p>
            )}
        </div>
    );
};

export default CropRecommendation;
