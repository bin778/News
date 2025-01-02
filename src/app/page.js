'use client';
import { ERROR_MESSAGE } from './constant/error.js';
import { useEffect, useState } from 'react';
import { filterNewsByKeyword } from './utils/filter.js';
import { fetchNews } from './api/api.js';
import { NewsList } from './component/NewsList.js';
import { useSearchKeyword } from './hooks/useSearchKeyword.js';

const Home = () => {
  const [state, setState] = useState({ news: [], loading: true, error: null });
  const { searchKeyword, applyKeyword, handleSearchChange, handleSearchApply } = useSearchKeyword();
  const filteredNews = filterNewsByKeyword(state.news, applyKeyword);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsItems = await fetchNews();
        setState({ news: newsItems, loading: false, error: null });
      } catch {
        setState({ news: [], loading: false, error: ERROR_MESSAGE.API.fetch });
      }
    };
    loadNews();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchApply();
    }
  };

  if (state.loading) return <p className="loading">Loading...</p>;
  if (state.error) return <p className="error">{state.error}</p>;

  return (
    <div className="container">
      <h1 className="title">News List</h1>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="searchInput"
      />
      <button onClick={handleSearchApply} className="searchButton">
        검색
      </button>
      <NewsList news={filteredNews} />
    </div>
  );
};

export default Home;
