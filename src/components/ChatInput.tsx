import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSendMessage(text);
    setText(""); // Clear input after sending
  };

  return (
    <div className="fixed bottom-0 w-full bg-white p-2 border-t flex items-center">
      <textarea
        className="flex-1 border rounded-lg p-2 focus:outline-none resize-none"
        rows={2}
        placeholder="Type your text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
        onClick={handleSend}
      >
        ➤
      </button>
    </div>
  );
};

export default ChatInput;