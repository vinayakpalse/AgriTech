import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


const cropsData = [
    {
        name: "Wheat",
        benefits: "High in fiber and protein, good for heart health.",
        conditions: "Grows best in well-drained soil with full sun.",
    },
    {
        name: "Rice",
        benefits: "Rich in carbohydrates, a staple food for many.",
        conditions: "Prefers warm temperatures and plenty of water.",
    },
    {
        name: "Corn",
        benefits: "High in vitamins and minerals, great for energy.",
        conditions: "Needs full sun and well-drained soil.",
    },
    {
        name: "Soybean",
        benefits: "Excellent source of protein and healthy fats.",
        conditions: "Thrives in warm weather and well-drained soil.",
    },
];

const PredictCrop = () => {
    const [stateName, setStateName] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    const handlePredict = async () => {
        setPrediction(null);
        setError(null);

        if (!stateName.trim()) {
            setError("Please enter a state name.");
            return;
        }

        try {
            console.log("📡 Sending request to backend...");
            const response = await axios.post("http://127.0.0.1:5000/predict", {
                state_name: stateName.trim().toLowerCase(),
            });

            console.log("✅ Response received:", response.data);
            setPrediction(response.data.recommended_crop);
        } catch (error) {
            console.error("❌ Prediction error:", error);
            setError(error.response?.data?.error || "Failed to fetch prediction.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center  bg-gray-100 rounded-lg shadow-md">
              <Navbar />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Crop Prediction</h2>
            <input
                type="text"
                className="p-2 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                placeholder="Enter State Name"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                onClick={handlePredict}
            >
                Predict
            </button>

            {prediction && (
                <h3 className="mt-4 text-lg text-green-600">Recommended Crop: {prediction}</h3>
            )}
            {error && (
                <p className="mt-2 text-red-500">{error}</p>
            )}

            {/* Crop Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 w-full">
                {cropsData.map((crop, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <h4 className="text-xl font-semibold text-gray-800">{crop.name}</h4>
                        <p className="mt-2 text-gray-600"><strong>Benefits:</strong> {crop.benefits}</p>
                        <p className="mt-1 text-gray-600"><strong>Conditions:</strong> {crop.conditions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PredictCrop;