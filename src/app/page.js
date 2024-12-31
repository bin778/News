'use client';
import { ERROR_MESSAGE } from '@/constant/error.js';
import { removeHtmlTagsRegex } from '@/constant/regex.js';
import { useEffect, useState } from 'react';

const removeHtmlTags = (text) => text.replace(removeHtmlTagsRegex, '');

const NewsList = ({ news }) => (
  <ul className="newsList">
    {news.map((item, index) => (
      <li key={index} className="newsCard">
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="link">
          {removeHtmlTags(item.title)}
        </a>
        <p className="description">{removeHtmlTags(item.description)}</p>
      </li>
    ))}
  </ul>
);

const Home = () => {
  const [state, setState] = useState({ news: [], loading: true, error: null });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news?query=');
      const data = await response.json();
      setState({ news: data.items || [], loading: false, error: null });
    } catch {
      setState({ news: [], loading: false, error: ERROR_MESSAGE.API.fetch });
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredNews = state.news.filter((item) =>
    removeHtmlTags(item.title).toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchNews();
  }, []);

  if (state.loading) return <p className="loading">Loading...</p>;
  if (state.error) return <p className="error">{state.error}</p>;

  return (
    <div className="container">
      <h1 className="title">News List</h1>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchQuery}
        onChange={handleSearchChange}
        className="searchInput"
      />
      <NewsList news={filteredNews} />
    </div>
  );
};

export default Home;
