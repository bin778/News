import { useState, useRef, useCallback } from 'react';
import { fetchNews } from '../api/api.js';
import { filterByTitle } from '../utils/filter.js';
import { ERROR_MESSAGE } from '../constant/error.js';
import { DATA } from '../constant/data.js';
import { handleTimeout } from '../utils/timeout.js';

const getCachedNews = (cache, cacheKey, setState) => {
  if (cache.current[cacheKey]) {
    setState({ news: cache.current[cacheKey], loading: false, error: null });
    return true;
  }
  return false;
};

const fetchAndFilterNews = async (page, appliedKeyword, cacheKey, cache, setState) => {
  try {
    const newsItems = await fetchNews(page, appliedKeyword);
    const filteredNews = filterByTitle(newsItems, appliedKeyword);
    cache.current[cacheKey] = filteredNews;
    setState({ news: filteredNews, loading: false, error: null });
  } catch (error) {
    setState({ news: [], loading: false, error: error.message });
  }
};

const setupTimeout = (loadingRef, setState, setTimeoutOccurred) => {
  return handleTimeout(() => {
    if (loadingRef.current) {
      setState({ news: [], loading: false, error: ERROR_MESSAGE.API.loading });
      setTimeoutOccurred(true);
    }
  }, DATA.TIME.request);
};

export const useNewsLoader = (page, appliedKeyword, setTimeoutOccurred) => {
  const [state, setState] = useState({ news: [], loading: false, error: null });
  const cache = useRef({});
  const loadingRef = useRef(false);

  const loadNews = useCallback(async () => {
    if (loadingRef.current) return;
    const cacheKey = `${page}-${appliedKeyword}`;
    if (getCachedNews(cache, cacheKey, setState)) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    const timeout = setupTimeout(loadingRef, setState, setTimeoutOccurred);
    loadingRef.current = true;
    await fetchAndFilterNews(page, appliedKeyword, cacheKey, cache, setState);
    loadingRef.current = false;
    clearTimeout(timeout);
  }, [page, appliedKeyword, setTimeoutOccurred]);
  return { state, loadNews };
};
