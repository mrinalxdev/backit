import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import LoadingIndicator from "./LoadingIndicator";
import { SendHorizontal } from "lucide-react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchConversationHistory = async () => {
      const storedConversationId = localStorage.getItem("conversationId");
      if (storedConversationId) {
        setConversationId(storedConversationId);
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:8787/conversation/${storedConversationId}`);
          const data = await response.json();
          if (data.conversation) {
            setMessages(data.conversation);
          }
        } catch (error) {
          console.error("Error fetching conversation history:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchConversationHistory();
  }, []);

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8787/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, conversationId }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
      if (data.conversationId) {
        setConversationId(data.conversationId);
        localStorage.setItem("conversationId", data.conversationId);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[895px] max-sm:h-[800px] w-[90%] max-sm:w-full mx-auto bg-[url('/main-bg.png')] rounded-xl mt-6">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-slate-900 text-white"
                  : "bg-indigo-900 text-white"
              }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-[40px] mb-3 mt-4 w-[100%] sm:w-[70%] max-sm:w-[90%] mx-auto bg-white"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg px-4 py-1 focus:outline-none text-lg"
            placeholder="Type your message..."
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 flex items-center justify-center rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <SendHorizontal />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;