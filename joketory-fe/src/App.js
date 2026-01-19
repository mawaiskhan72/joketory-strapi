import React, { useEffect, useState, useCallback } from "react";
import { GiJesterHat } from "react-icons/gi";
import { FaImage } from "react-icons/fa";
import Joke from "./components/Joke";
import Meme from "./components/Meme";

const API_BASE_URL = "http://localhost:1337/api";
const JOKES_API = `${API_BASE_URL}/jokes`;
const MEMES_API = `${API_BASE_URL}/memes`;

const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Update the TabButton component
const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 text-lg font-medium rounded-t-lg flex items-center space-x-2 transition-all duration-300 ${
      active
        ? 'bg-gray-800 text-pink-400 border-b-2 border-pink-500'
        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
    }`}
  >
    <Icon className="text-xl" />
    <span>{children}</span>
  </button>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('jokes');
  const [jokes, setJokes] = useState([]);
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState({ jokes: true, memes: true });
  const [error, setError] = useState({ jokes: null, memes: null });

const fetchMemes = useCallback(async () => {
  try {
    const res = await fetch(`${MEMES_API}?populate=*`);
    if (!res.ok) throw new Error(`Memes API Error: ${res.status}`);

    const { data } = await res.json();
    if (!Array.isArray(data)) throw new Error("Invalid Memes API response structure");

    const mapped = data.map((meme) => {
      const firstImage = Array.isArray(meme.image) ? meme.image[0] : null;
      let imageUrl = null;
      
      if (firstImage) {
        // Try to get the small format first, then fall back to original
        imageUrl = firstImage.formats?.small?.url || firstImage.url;
        
        // Make sure the URL is absolute
        if (imageUrl) {
          // Remove any leading slashes to avoid double slashes
          const cleanUrl = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
          // Use the full URL with the correct base
          imageUrl = `http://localhost:1337/${cleanUrl}`;
        }
      }
      
      return {
        id: meme.id.toString(),
        imageUrl,
        category: meme.category || "General",
        formattedDate: formatDate(meme.uploaded || meme.createdAt || meme.updatedAt) || "Recently",
        title: meme.title || "Untitled Meme",
        description: meme.description || ""
      };
    });

    setMemes(mapped);
    setError(prev => ({ ...prev, memes: null }));
  } catch (err) {
    console.error('Error in fetchMemes:', err);
    setError(prev => ({ ...prev, memes: err.message }));
  } finally {
    setLoading(prev => ({ ...prev, memes: false }));
  }
}, []);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const res = await fetch(JOKES_API);
        if (!res.ok) throw new Error(`Jokes API Error: ${res.status}`);

        const { data } = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid Jokes API response structure");

        const mapped = data.map((joke, index) => ({
          id: `joke-${index + 1}`,
          title: joke.title || "Untitled",
          content: joke.content || "",
          category: joke.category || "General",
          author: joke.author || "Anonymous",
          formattedDate: formatDate(joke.uplodedTime || joke.publishedAt || joke.createdAt) || "Just now"
        }));

        setJokes(mapped);
        setError(prev => ({ ...prev, jokes: null }));
      } catch (err) {
        setError(prev => ({ ...prev, jokes: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, jokes: false }));
      }
    };

    fetchJokes();
    fetchMemes();
  }, [fetchMemes]);

  const renderContent = () => {
    const LoadingSpinner = ({ message }) => (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
        <p className="mt-4 text-gray-400">{message}</p>
      </div>
    );

    const ErrorMessage = ({ error, onRetry }) => (
      <div className="bg-red-900/30 border border-red-700 text-red-200 px-6 py-4 rounded-lg">
        <p className="font-bold">Error loading content</p>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={onRetry}
          className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );

    if (activeTab === 'jokes') {
      if (loading.jokes) return <LoadingSpinner message="Loading jokes..." />;
      if (error.jokes) return <ErrorMessage error={error.jokes} onRetry={() => window.location.reload()} />;

      return (
        <div className="space-y-8">
          {jokes.length > 0 ? (
            jokes.map((joke) => (
              <Joke
                key={joke.id}
                title={joke.title}
                content={joke.content}
                category={joke.category}
                author={joke.author}
                formattedDate={joke.formattedDate}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No jokes found. Check back later!</p>
            </div>
          )}
        </div>
      );
    }

    if (loading.memes) return <LoadingSpinner message="Loading memes..." />;
    if (error.memes) return <ErrorMessage error={error.memes} onRetry={() => window.location.reload()} />;

    return (
      <div className="space-y-8">
        {memes.length > 0 ? (
          memes.map((meme) => (
            <Meme
              key={meme.id}
              imageUrl={meme.imageUrl}
              category={meme.category}
              formattedDate={meme.formattedDate}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No memes found. Check back later or upload one!</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            Joketory
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            A collection of the funniest content on the internet
          </p>
          
          <div className="flex justify-center space-x-2 mb-8 border-b border-gray-700">
            <TabButton 
              active={activeTab === 'jokes'} 
              onClick={() => setActiveTab('jokes')}
              icon={GiJesterHat}
            >
              Jokes
            </TabButton>
            <TabButton 
              active={activeTab === 'memes'} 
              onClick={() => setActiveTab('memes')}
              icon={FaImage}
            >
              Memes
            </TabButton>
          </div>
        </div>

        <div className="mt-8">
          {renderContent()}
        </div>

        <footer className="mt-20 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} Joketory — Made with
        </footer>
      </div>
    </div>
  );
}