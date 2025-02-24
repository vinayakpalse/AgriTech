import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const schemesData = [
    {
        title: "Kisan Credit Card",
        description: "A credit card scheme for farmers to meet their short-term credit needs.",
        details: "Provides loans for agricultural and related activities.",
        link: "https://www.pnbindia.in/en/home/kisan-credit-card.html", // Example link
    },
    {
        title: "Pradhan Mantri Fasal Bima Yojana",
        description: "Crop insurance scheme to support farmers in case of crop failure.",
        details: "Covers losses due to natural calamities.",
        link: "https://pmfby.gov.in/", // Example link
    },
    {
        title: "Soil Health Card Scheme",
        description: "Promotes sustainable farming through soil health assessment.",
        details: "Provides farmers with information on soil health and nutrient management.",
        link: "https://www.nfsm.gov.in/SoilHealthCard.aspx", // Example link
    },
    {
        title: "National Agriculture Market (eNAM)",
        description: "Online trading platform for agricultural commodities.",
        details: "Facilitates direct marketing of farmers' produce.",
        link: "https://enam.gov.in/web/index", // Example link
    },
    {
        title: "Pradhan Mantri Krishi Sinchai Yojana",
        description: "Irrigation scheme to improve water efficiency in agriculture.",
        details: "Aims to provide 'Har Khet Ko Pani'.",
        link: "https://pmksy.gov.in/", // Example link
    },
    {
        title: "Rashtriya Krishi Vikas Yojana",
        description: "Promotes holistic growth of agriculture in the country.",
        details: "Focuses on increasing productivity and income of farmers.",
        link: "https://rkvy.nic.in/", // Example link
    },
    {
        title: "PM Kisan Samman Nidhi",
        description: "Direct income support scheme for farmers.",
        details: "Provides financial assistance of ₹6000 per year.",
        link: "https://pmkisan.gov.in/", // Example link
    },
    {
        title: "Mahatma Gandhi National Rural Employment Guarantee Act",
        description: "Guarantees 100 days of wage employment in a financial year.",
        details: "Supports rural livelihoods and agricultural activities.",
        link: "https://nrega.nic.in/netnrega/home.aspx", // Example link
    },
    {
        title: "Integrated Farming System",
        description: "Promotes sustainable farming practices.",
        details: "Encourages diversification of crops and livestock.",
        link: "https://www.icar.org.in/en/node/1030", // Example link
    },
    {
        title: "National Livestock Mission",
        description: "Enhances livestock production and productivity.",
        details: "Supports farmers in improving their livestock.",
        link: "https://dahd.nic.in/hi/node/1030", // Example link
    },
    {
        title: "Pradhan Mantri Ujjwala Yojana",
        description: "Provides LPG connections to women from BPL households.",
        details: "Aims to reduce dependence on firewood and improve health.",
        link: "https://pmujjwalayojana.com/", // Example link
    },
    {
        title: "Digital India Initiative",
        description: "Promotes digital literacy and access to information.",
        details: "Empowers farmers with technology for better decision-making.",
        link: "https://digitalindia.gov.in/", // Example link
    },
];

function App() {
    const [schemes, setSchemes] = useState(schemesData);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simulating a loading state
        setLoading(false);
    }, []);

    return (
        <div className=" bg-gray-100">
            <Navbar />
            <h1 className="text-3xl font-bold mb-6 text-center">Government & Private Schemes</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {schemes.length > 0 ? (
                        schemes.map((scheme, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration- 200 animate-fadeIn">
                                <h2 className="text-xl font-semibold text-gray-800">{scheme.title}</h2>
                                <p className="mt-2 text-gray-600">{scheme.description}</p>
                                <p className="mt-1 text-gray-500"><strong>Details:</strong> {scheme.details}</p>
                                <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-500 hover:underline">
                                    Learn More
                                </a>
                            </div>
                        ))
                    ) : (
                        <p>No schemes available.</p>
                    )}
                </div>
            )}
            <Footer />
        </div>
    );
}

export default App;