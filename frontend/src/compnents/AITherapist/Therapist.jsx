import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loader from "react-js-loader";
import Navbar from "../navbar/Navbar";
import "./Therapist.css";

// ✅ Your Gemini API key
const API_KEY = "AIzaSyBZU_4OMaKevQwEvtuf_C54_ZUWoCJxprs";
const genAI = new GoogleGenerativeAI(API_KEY);

// Replace this with your logged-in username or state from auth
const username = "exampleUser";

const TypingAnimation = ({ color }) => (
  <div className="item text-2xl">
    <Loader type="ping-cube" bgColor={color} color={color} size={100} />
  </div>
);

const Therapist = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // Fetch chat history on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/${username}`);
        const data = await res.json();
        if (data.success) setMessages(data.messages);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };
    fetchChatHistory();
  }, []);

  // Save chat to backend
  const saveChatToServer = async (updatedMessages) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/chat/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, messages: updatedMessages }),
      });
    } catch (err) {
      console.error("Error saving chat:", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `You are a kind and supportive therapist.
Analyse the user's input and respond in a clear **numbered list**, with each point starting on a **new line**.
Do not combine points in the same line. Do not write paragraphs. Only provide short, readable points.

User: ${input}
Therapist:`;

      // ✅ Use updated SDK method
      const result = await model.generateContent(prompt);
      let aiMessage = result.response.text();

      // Small delay for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const finalMessages = [
        ...updatedMessages,
        { sender: "ai", text: aiMessage },
      ];
      setMessages(finalMessages);
      saveChatToServer(finalMessages);
    } catch (error) {
      console.error("Error generating response:", error);

      let aiText = "⚠️ An error occurred while generating the response.";
      if (error.message?.includes("429")) {
        aiText =
          "⚠️ API limit reached for today. Please try again later or enable billing for more requests.";
      }

      const finalMessages = [
        ...updatedMessages,
        { sender: "ai", text: aiText, error: true },
      ];
      setMessages(finalMessages);
      saveChatToServer(finalMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    if (chatBoxRef.current)
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="therapist-container">
        <h1 className="heading">Your Personal AI Assistant</h1>
        <div ref={chatBoxRef} className="chat-box">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.error
                  ? "error-message"
                  : msg.sender === "user"
                  ? "user-message"
                  : "ai-message"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <TypingAnimation color="#007BFF" />}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="input-field"
          />
          <button onClick={handleSend} className="send-button">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Therapist;
