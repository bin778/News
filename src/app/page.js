'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news?query=Next.js');
        const data = await response.json();
        setNews(data.items || []);
      } catch (err) {
        setError('[ERROR] 뉴스를 가져오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>네이버 뉴스</h1>
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title.replace(/<[^>]*>?/gm, '')}
            </a>
            <p>{item.description.replace(/<[^>]*>?/gm, '')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
