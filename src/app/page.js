'use client';
import { useEffect, useState, useRef } from 'react';
import { fetchNews } from './api/api.js';
import { NewsList } from './component/NewsList.js';
import { Pagination } from './component/Pagination.js';
import { SearchInput } from './component/SearchInput.js';
import { filterByTitle } from './utils/filter.js';
import { useSearchKeyword } from './hooks/useSearchKeyword.js';
import { ERROR_MESSAGE } from './constant/error.js';
import { DATA } from './constant/data.js';

const Home = () => {
  const [state, setState] = useState({ news: [], loading: false, error: null });
  const [page, setPage] = useState(1);
  const [appliedKeyword, setAppliedKeyword] = useState('');
  const [timeoutOccurred, setTimeoutOccurred] = useState(false);
  const { searchKeyword, handleSearchChange } = useSearchKeyword();
  const cache = useRef({});
  const loadingRef = useRef(false);

  const loadNews = async () => {
    if (loadingRef.current || timeoutOccurred) return;
    loadingRef.current = true;

    const cacheKey = `${page}-${appliedKeyword}`;
    if (cache.current[cacheKey]) {
      setState({ news: cache.current[cacheKey], loading: false, error: null });
      loadingRef.current = false;
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));
    const timeout = setTimeout(() => {
      if (loadingRef.current) {
        setState({ news: [], loading: false, error: ERROR_MESSAGE.API.loading });
        setTimeoutOccurred(true);
        loadingRef.current = false;
      }
    }, DATA.TIME.request);

    try {
      const newsItems = await fetchNews(page, appliedKeyword);
      const filteredNews = filterByTitle(newsItems, appliedKeyword);
      cache.current[cacheKey] = filteredNews;
      setState({ news: filteredNews, loading: false, error: null });
    } catch (error) {
      setState({ news: [], loading: false, error: error.message });
    } finally {
      loadingRef.current = false;
      clearTimeout(timeout);
    }
  };

  useEffect(() => {
    loadNews();
  }, [page, appliedKeyword]);

  const handleSearchApply = () => {
    setAppliedKeyword(searchKeyword);
  };

  if (timeoutOccurred || state.error) return <p className="error">{state.error || ERROR_MESSAGE.API.loading}</p>;

  return (
    <div className="container">
      <h1 className="title">News List</h1>
      <SearchInput
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
        onSearchApply={handleSearchApply}
      />
      <NewsList news={state.news} />
      {state.loading && <p className="loading">Loading...</p>}
      <Pagination currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default Home;
