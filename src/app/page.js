'use client';
import { ERROR_MESSAGE } from './constant/error.js';
import { useEffect, useState } from 'react';
import { fetchNews } from './api/api.js';
import { NewsList } from './component/NewsList.js';
import { useSearchKeyword } from './hooks/useSearchKeyword.js';
import { DATA } from './constant/data.js';

const Home = () => {
  const [state, setState] = useState({ news: [], loading: false, error: null });
  const [page, setPage] = useState(1);
  const [appliedKeyword, setAppliedKeyword] = useState('');
  const { searchKeyword, handleSearchChange } = useSearchKeyword();

  const filterByTitle = (newsItems, keyword) => {
    if (!keyword) return newsItems;
    return newsItems.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));
  };

  const loadNews = async (pageNumber, keyword) => {
    setState({ news: [], loading: true, error: null });
    try {
      const newsItems = await fetchNews(pageNumber);
      const filteredNews = filterByTitle(newsItems, keyword);
      setState({ news: filteredNews, loading: false, error: null });
    } catch {
      setState({ news: [], loading: false, error: ERROR_MESSAGE.API.fetch });
    }
  };

  useEffect(() => {
    loadNews(page, appliedKeyword);
  }, [page, appliedKeyword]);

  const handleSearchApply = () => {
    setAppliedKeyword(searchKeyword);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
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

      <div className="pagination">
        {Array.from({ length: DATA.NEWS.page }, (_, index) => (
          <button
            key={index + 1}
            className={`paginationButton ${page === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
