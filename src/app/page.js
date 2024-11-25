"use client";

import { useState } from "react";
import { handleGenerateText } from "./action";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input) {
      const userMessage = { role: "user", content: input };
      const generatedText = await handleGenerateText(input);
      const aiMessage = {
        role: "ai",
        content:
          generatedText || "Error: Could not fetch response from Gemini AI.",
      };

      setChatHistory([...chatHistory, userMessage, aiMessage]);
      setInput("");
    } else {
      alert("Please enter some text.");
    }
  };

  return (
    <div className="layout-container">
      {/* title */}
      <header className="title">BITSBOT</header>
      <p id="info">ASK ANYTHING ABOUT BITS:</p>
      <main>
        <div className="chat-container">
          {chatHistory.map((message, index) => (
            <div key={index} className={`chat-bubble ${message.role}`}>
              {message.role === "ai" ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here"
            className="input-field"
          />
          <button type="submit" className="submit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19V5m-7 7l7-7 7 7"
              />
            </svg>
          </button>
        </form>
      </main>
    </div>
  );
}
