import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion"; // Importing framer-motion for animations
import { useInView } from "react-intersection-observer"; // Importing Intersection Observer
import Chatbot from "../components/Chatbot";

const Card = ({ title, description, delay }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-xl font-semibold text-center">{title}</h3>
      <p className="mt-2 text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="relative">
      {/* Navbar component */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center z-0" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white p-4"
          >
            <h2 className="text-4xl font-bold">Welcome to Farmer Empowerment</h2>
            <p className="mt-2 text-lg">
              Explore government schemes, real-time market insights, weather updates, and more.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Farmers Info Section */}
      <div className="p-8 bg-gray-100 relative z-10">
        <h2 className="text-3xl font-bold text-center mt-8">Farmers Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Cards with scroll animations */}
          <Card title="Government Schemes" description="Learn about various government schemes available for farmers to enhance their productivity and income." delay={0.1} />
          <Card title="Market Insights" description="Get real-time market insights to make informed decisions about your crops and sales." delay={0.2} />
          <Card title="Weather Updates" description="Stay updated with the latest weather forecasts to plan your farming activities effectively." delay={0.3} />
          <Card title="Crop Management" description="Discover best practices for crop management to maximize yield and sustainability." delay={0.4} />
          <Card title="Pest Control" description="Learn effective pest control methods to protect your crops and ensure healthy growth." delay={0.5} />
          <Card title="Irrigation Techniques" description="Explore various irrigation techniques to optimize water usage and improve crop yield." delay={0.6} />
          <Card title="Soil Health" description="Understand the importance of soil health and how to maintain it for better crop production." delay={0.7} />
          <Card title="Organic Farming" description="Learn about organic farming practices and how they can benefit your crops and the environment." delay={0.8} />
          <Card title="Financial Assistance" description="Find out about financial assistance programs available for farmers." delay={0.9} />
        </div>
      </div>

      {/* Widgets Section */}
      <div className="p-8 bg-white relative z-10">
        <h2 className="text-3xl font-bold text-center mt-8">Useful Widgets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <motion.div
            className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-center">Weather Widget</h3>
            <p className="mt-2 text-center">Get real-time weather updates tailored for farmers.</p>
          </motion.div>

          <motion.div
            className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-center">Market Prices</h3>
            <p className="mt-2 text-center">Check the latest market prices for your crops.</p>
          </motion.div>

          <motion.div
            className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-center">Farming Tips</h3>
            <p className="mt-2 text-center">Get daily tips and tricks to improve your farming practices.</p>
          </motion.div>
        </div>
      </div>

      {/* Chatbot Button */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg z-50"
        >
          Assistant
        </button>
      )}

      {/* Chatbot Component */}
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}

      <Footer />
    </div>
  );
};

export default Home;