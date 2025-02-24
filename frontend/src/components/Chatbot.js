import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  // Send message to backend
  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: userInput,
      });

      const botReply = { sender: "bot", text: response.data.reply };
      setMessages([...messages, userMessage, botReply]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...messages,
        userMessage,
        { sender: "bot", text: "Something went wrong. Try again!" },
      ]);
    }

    setUserInput("");
  };

  return (
    <div className="fixed bottom-16 right-6 w-80 bg-white shadow-lg rounded-lg border p-4">
      {/* Chatbot Header with Close Button */}
      <div className="flex justify-between items-center border-b pb-2">
        <h3 className="text-lg font-semibold">AgriBot</h3>
        <button onClick={onClose} className="text-red-500">
          <FaTimes size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 ${
              msg.sender === "user" ? "text-right text-blue-600" : "text-left text-gray-600"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center border-t pt-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l-md focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
