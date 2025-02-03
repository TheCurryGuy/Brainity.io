import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../components/Card'; 
import { BrainIcon } from '../icons/BrainIcon'; 
import { Button } from '../components/Button';

type ContentType = 'youtube' | 'twitter' | 'links' | 'note';

type Content = {
  title: string;
  description: string;
  link?: string; // Optional field
  type: ContentType;
};

type ApiResponse = {
  username: string;
  content: Content[];
};

function SharedBrain() {
  const { shareId } = useParams<{ shareId: string }>();
  const [contents, setContents] = useState<Content[]>([]);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSharedBrain = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://brainity-server.vercel.app/api/v1/brain/${shareId}`
        );
        setContents(response.data.content);
        setUsername(response.data.username);
      } catch (err: any) {
        setError(
          err.response?.data?.message || 'Failed to fetch shared brain.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSharedBrain();
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center">
        <p className="text-2xl text-purple-900">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center">
        <p className="text-2xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!contents || contents.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center">
        <p className="text-2xl text-purple-900">No contents found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      {/* Navbar */}
      <nav className="w-full max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <BrainIcon />
          <div onClick={() => (window.location.href = '/')} className="cursor-pointer text-2xl font-bold text-purple-900">Brainity.io</div>
        </div>
        <Button
          variant="primary"
          text="Get Started"
          onClick={() => (window.location.href = '/signup')}
          size="lg"
          className="hidden md:block"
        />
      </nav>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-purple-900 text-center mb-8">
          {username}'s Shared Brain
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content, index) => (
            <Card
              key={index}
              title={content.title}
              description={content.description}
              link={content.link}
              type={content.type}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 w-full max-w-6xl mx-auto text-center text-purple-700">
        <a href="https://github.com/TheCurryGuy" target="_blank" rel="noopener noreferrer">
          <p>&copy; 2025 Brainity.io | TheCurryGuy | All rights reserved.</p>
        </a>
      </footer>
    </div>
  );
}

export default SharedBrain;