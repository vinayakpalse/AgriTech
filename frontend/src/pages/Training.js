import React from "react";
import "./TrainingPage.css"; // Import the CSS file
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const trainingData = [
    {
        title: "Farming Practices Panel",
        description: "A panel discussion dissecting competing philosophies in Vermont agriculture, featuring experts from NOFA VT and UVM.",
        details: "Watch here",
        videoUrl: "https://www.youtube.com/embed/1g1g1g1g1g1g", // Replace with actual video URL
    },
    {
        title: "The Best Farmer Training Program I've Seen",
        description: "An in-depth look into an effective farmer training program, highlighting sustainable practices and soil health.",
        details: "Watch here",
        videoUrl: "https://www.youtube.com/embed/2g2g2g2g2g2g", // Replace with actual video URL
    },
    {
        title: "Learn How to Become a Successful Farmer in 6 Months with UVM's Farmer Training Program",
        description: "An overview of the University of Vermont's six-month, hands-on program designed for aspiring farmers and food systems advocates.",
        details: "Watch here",
        videoUrl: "https://www.youtube.com/embed/3g3g3g3g3g3g", // Replace with actual video URL
    },
    {
        title: "Webinar: Farmer Training Programs Overview",
        description: "A comprehensive webinar providing insights into various farmer training programs and their benefits.",
        details: "Watch here",
        videoUrl: "https://www.youtube.com/embed/4g4g4g4g4g4g", // Replace with actual video URL
    },
    {
        title: "Agricultural Training Series Part One",
        description: "The first part of a series focusing on farmland access and leasing, offering valuable information for both farmers and landowners.",
        details: "Watch here",
        videoUrl: "https://www.youtube.com/embed/5g5g5g5g5g5g", // Replace with actual video URL
    },
    {
        title: "Veterans Getting Training On The Farm",
        description: "A feature on programs that provide agricultural training to veterans, helping them transition into farming careers.",
        details: "Watch here",
        videoUrl: "https://www.youtube.com/embed/6g6g6g6g6g6g", // Replace with actual video URL
    },
    {
        title: "A Day in the Life of a Farm Worker: Part I - Safe Harvesting Practices",
        description: "An educational video demonstrating safe harvesting practices and the daily routines of farm workers.",
        details: "Watch here",
        videoUrl: "https://www.youtube.com/embed/7g7g7g7g7g7g", // Replace with actual video URL
    },
    {
        title: "Millennial Farmer Channel",
        description: "Follow a 5th generation family farmer from West Central Minnesota as he shares day-to-day experiences on the family farm.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/8g8g8g8g8g8g", // Replace with actual video URL
    },
    {
        title: "How Farms Work",
        description: "Educational videos that thoroughly explain various farming operations, equipment, and day-to-day activities on a crop and cattle farm.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/9g9g9g9g9g9g", // Replace with actual video URL
    },
    {
        title: "Just a Few Acres Farm",
        description: "A small family farm sharing insights into sustainable farming practices, livestock management, and crop cultivation.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/10g10g10g10g", // Replace with actual video URL
    },
    {
        title: "The Market Gardener",
        description: "Insights into intensive vegetable production and small-scale farming techniques for profitable and sustainable agriculture.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/11g11g11g11g", // Replace with actual video URL
    },
    {
        title: "It's a Farming Life for Me",
        description: "A channel showcasing the daily life and challenges of farming, including livestock care, crop management, and machinery use.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/12g12g12g12g", // Replace with actual video URL
    },
    {
        title: "Ask Tractor Mike",
        description: "Educational content focused on tractors and implements, offering advice and tutorials for both novice and experienced farmers.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/13g13g13g13g", // Replace with actual video URL
    },
    {
        title: "The Hoof GP",
        description: "A Scottish cattle hoof trimmer shares educational and satisfying videos on hoof care and livestock management.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/14g14g14g14g", // Replace with actual video URL
    },
    {
        title: "Digital Green",
        description: "An organization that trains farmers to create and share short videos, highlighting agricultural problems, solutions, and success stories.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/15g15g15g15g", // Replace with actual video URL
    },
    {
        title: "Chris Fesko's On the Farm",
        description: "Educational videos for children about dairy farming, offering insights into farm operations and animal care.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/16g16g16g16g", // Replace with actual video URL
    },
    {
        title: "Zeorian Harvesting & Trucking",
        description: "A family-owned custom harvesting business shares experiences and challenges faced during the harvesting season across various states.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/17g17g17g17g", // Replace with actual video URL
    },
    {
        title: "Field Rows",
        description: "A channel offering a glimpse into the life of a Southern farmer, covering topics like equipment operation, crop cultivation, and farm maintenance.",
        details: "Visit channel",
        videoUrl: "https://www.youtube.com/embed/18g18g18g18g", // Replace with actual video URL
    },
];

const TrainingPage = () => {
    return (
        <div>
             <Navbar />
            <h1><b>Training Programs for Farmers</b></h1>
            <div className="card-container">
                {trainingData.map((training, index) => (
                    <div className="card" key={index}>
                        <h3>{training.title}</h3>
                        <p>{training.description}</p>
                        <p>{training.details}</p>
                        <div className="video-container">
                            {training.videoUrl ? (
                                <iframe
                                    width="100%"
                                    height="150"
                                    src={training.videoUrl}
                                    title={training.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <img
                                    src="https ://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                                    alt="YouTube Logo"
                                    width="100"
                                    height="100"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default TrainingPage;