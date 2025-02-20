import { useState } from "react";
import ChatInput from "../components/ChatInput";
import ChatOutput from "../components/ChatOutput";

export default function Home() {
  const [messages, setMessage] = useState<string[]>([]);

  const handleSendMessage = (text: string) => {
    setMessage([...messages, text]);
  };

  return (
    <div className="min-h-screen flex-col items-center p-4 bg-gray-200">
      <div className="w-full max-w-2xl">
        {messages.map((msg, index) => (
          <ChatOutput key={index} text={msg} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}