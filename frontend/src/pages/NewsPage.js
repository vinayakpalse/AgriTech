import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState(""); // Search query
  const [searchTerm, setSearchTerm] = useState(""); // Stores user input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en"); // Default language: English

  const API_KEY = "98e32538fbf14f6bb368c9dce1b7510a"; // NewsAPI Key

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");

      try {
        console.log(`🔎 Fetching news for: ${query || "Agriculture, Finance, Government Schemes"} in ${language}`);

        // Default query (agriculture, finance, schemes)
        const keywordQuery = query || "agriculture OR finance OR government schemes";

        // Fetch news based on selected language
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          keywordQuery
        )}&language=${language}&sortBy=publishedAt&apiKey=${API_KEY}`;

        const response = await axios.get(url);

        if (response.data.articles.length === 0) {
          setError("⚠️ No relevant news found.");
        } else {
          setNews(response.data.articles);
        }
      } catch (err) {
        console.error("❌ Error fetching news:", err.response?.data || err.message);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query, language]); // Fetch news when query or language changes

  // Handle form submission for search
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          {query ? `News on "${query}"` : "Latest Agriculture, Finance & Schemes News"}
        </h1>

        {/* Language Selection Buttons */}
        <div className="mb-6 flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${language === "en" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"}`}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
          <button
            className={`px-4 py-2 rounded-md ${language === "hi" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"}`}
            onClick={() => setLanguage("hi")}
          >
            हिंदी (Hindi)
          </button>
          <button
            className={`px-4 py-2 rounded-md ${language === "mr" ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"}`}
            onClick={() => setLanguage("mr")}
          >
            मराठी (Marathi)
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6 flex w-full max-w-md">
          <input
            type="text"
            placeholder="Search news (e.g., Technology, Finance, Agriculture)..."
            className="flex-1 p-3 border rounded-l-md focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {loading ? (
          <p className="text-xl text-gray-600">Loading news...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt="News"
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                <h2 className="text-xl font-semibold mt-3">{article.title}</h2>
                <p className="text-gray-600 mt-2">{article.description}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Published on: {new Date(article.publishedAt).toDateString()}
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mt-3 inline-block"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NewsPage;
