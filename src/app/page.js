'use client';
import { useEffect, useState } from 'react';
import { fetchNews } from './api/api.js';
import { NewsList } from './component/NewsList.js';
import { Pagination } from './component/Pagination.js';
import { filterByTitle } from './utils/filter.js';
import { useSearchKeyword } from './hooks/useSearchKeyword.js';

const Home = () => {
  const [state, setState] = useState({ news: [], loading: false, error: null });
  const [page, setPage] = useState(1);
  const [appliedKeyword, setAppliedKeyword] = useState('');
  const { searchKeyword, handleSearchChange } = useSearchKeyword();

  const loadNews = async () => {
    setState({ news: [], loading: true, error: null });
    try {
      const newsItems = await fetchNews(page, appliedKeyword);
      const filteredNews = filterByTitle(newsItems, appliedKeyword);
      setState({ news: filteredNews, loading: false, error: null });
    } catch (error) {
      setState({ news: [], loading: false, error: error.message });
    }
  };

  useEffect(() => {
    loadNews();
  }, [page, appliedKeyword]);

  const handleSearchApply = () => {
    setAppliedKeyword(searchKeyword);
  };

  if (state.error) return <p className="error">{state.error}</p>;

  return (
    <div className="container">
      <h1 className="title">News List</h1>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChange={handleSearchChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearchApply()}
        className="searchInput"
      />
      <button onClick={handleSearchApply} className="searchButton">
        검색
      </button>
      <NewsList news={state.news} />
      {state.loading && <p className="loading">Loading...</p>}
      <Pagination currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default Home;
