'use client';
import { ERROR_MESSAGE } from '@/constant/error.js';
import { removeHtmlTagsRegex } from '@/constant/regex.js';
import { useEffect, useState } from 'react';

function removeHtmlTags(text) {
  return text.replace(removeHtmlTagsRegex, '');
}

function NewList({ news }) {
  return (
    <ul>
      {news.map((item, index) => (
        <li key={index}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            {removeHtmlTags(item.title)}
          </a>
          <p>{removeHtmlTags(item.description)}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news?query=');
      const data = await response.json();
      setNews(data.items || []);
    } catch (err) {
      setError(ERROR_MESSAGE.API.fetch);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>네이버 뉴스</h1>
      <NewList news={news} />
    </div>
  );
}
