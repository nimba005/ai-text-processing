import { useState, useEffect } from "react";
import { detectLanguage, summarizeText, translateText } from "../lib/api";
import LanguageSelector from "./LanguageSelector";

interface ChatOutputProps {
  text: string;
}

const ChatOutput: React.FC<ChatOutputProps> = ({ text }) => {
  const [language, setLanguage] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);

  useEffect(() => {
    const detectLang = async () => {
      const lang = await detectLanguage(text);
      setLanguage(lang);
    };
    detectLang();
  }, [text]);

  const handleSummarize = async () => {
    if (text.length > 150 && language === "en") {
      const summaryResult = await summarizeText(text);
      setSummary(summaryResult);
    }
  };

  const handleTranslate = async (targetLang: string) => {
    const translatedText = await translateText(text, targetLang);
    setTranslation(translatedText);
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md my-2">
      <p className="text-lg font-medium">{text}</p>
      {language && <p className="text-sm text-gray-500">Detected Language: {language}</p>}

      {text.length > 150 && language === "en" && (
        <button
          onClick={handleSummarize}
          className="bg-green-500 text-white p-1 rounded-lg mt-2"
        >
          Summarize
        </button>
      )}

      <LanguageSelector onTranslate={handleTranslate} />

      {summary && <p className="text-sm text-gray-700 mt-2">Summary: {summary}</p>}
      {translation && <p className="text-sm text-gray-700 mt-2">Translation: {translation}</p>}
    </div>
  );
};

export default ChatOutput;