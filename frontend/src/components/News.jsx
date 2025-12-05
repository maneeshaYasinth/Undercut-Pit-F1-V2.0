import { useEffect, useState } from "react";
import { getNews } from "../services/newsService";
import bgVideo from "../assets/bg-video.mp4";

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
      } catch (err) {
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="relative min-h-screen w-screen overflow-y-auto">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/60 -z-10 pb-10" />

      <div className="relative z-10 p-6 min-h-screen text-white">
        <h1 className="text-4xl font-bold mt-10 mb-8 text-center drop-shadow-lg">
          Latest F1 News
        </h1>

        {loading && <p className="text-center">Loading news...</p>}
        {error && <p className="text-center text-red-300">{error}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item, index) => (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl hover:scale-105 transform transition duration-300"
            >
              <h2 className="text-xl font-semibold mb-3">{item.title}</h2>
              <p className="text-sm text-gray-200 mb-4">
                Source: {item.source}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
