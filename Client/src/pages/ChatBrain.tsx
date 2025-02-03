import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; 
import { FaArrowUp } from 'react-icons/fa'; 
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight'; 

const ChatBrain: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot'; text: string }>>([
    { type: 'bot', text: "Welcome to your Brain, Type to interact!" }
  ]);

  const handleQuerySubmit = async () => {
    if (!query.trim()) return;
  
    setIsLoading(true);
    const userMessage: { type: 'user' | 'bot'; text: string } = { type: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
  
    try {
      const result = await axios.post(
        'https://brainity-server.vercel.app/api/v1/chat',
        { query },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
  
      const botMessage: { type: 'user' | 'bot'; text: string } = { type: 'bot', text: result.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage: { type: 'user' | 'bot'; text: string } = { type: 'bot', text: 'Failed to fetch response. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };
  

  const handleCopyResponse = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Response copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="chat-main bg-[#F9FBFC] min-h-screen flex flex-col p-4 md:p-6">
      {/* Header */}
      <div className="header mb-4 md:mb-8 m-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
          <a href="/" className="hover:text-purple-700 transition-colors">
            ChatBrain 🧠
          </a>
        </h1>
        <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Your AI-powered Brain assistant</p>
      </div>

      {/* Chat Box */}
      <div className="chat-box flex-1 w-full max-h-[calc(100vh-200px)] overflow-y-auto mb-4 md:mb-6 bg-white rounded-lg shadow-md p-3 md:p-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`message ${message.type === 'user' ? 'user' : 'bot'} mb-3 md:mb-4`}
          >
            <div
              className={`message-text p-2 md:p-3 rounded-lg ${
                message.type === 'user' ? 'bg-purple-100 text-gray-800 ml-auto md:ml-64' : 'bg-gray-50 text-gray-800 mr-auto md:mr-64'
              }`}
            >
              {message.type === 'bot' ? (
                <div>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    className="prose text-sm md:text-base"
                  >
                    {message.text}
                  </ReactMarkdown>
                  <button
                    onClick={() => handleCopyResponse(message.text)}
                    className="copy-btn mt-1 md:mt-2 text-sm text-purple-500 hover:text-purple-700"
                  >
                    Copy Response
                  </button>
                </div>
              ) : (
                <p className="text-sm md:text-base">{message.text}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="loader text-center text-gray-600 text-sm md:text-base">Generating response...</div>
        )}
      </div>

      {/* Input Container */}
      <div className="input-container bg-white rounded-lg shadow-md p-3 md:p-4">
        <div className="flex items-center gap-2">
          <textarea
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm md:text-base"
            placeholder="Ask me anything about your Brain's memory..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleQuerySubmit();
              }
            }}
          />
          <button
            onClick={handleQuerySubmit}
            disabled={isLoading}
            className="p-2 md:p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:bg-purple-300 transition-colors"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBrain;