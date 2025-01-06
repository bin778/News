'use client';
import { useState, useEffect } from 'react';
import { NewsList } from './component/NewsList';
import { Pagination } from './component/Pagination';
import { SearchInput } from './component/SearchInput';
import { ErrorMessage } from './component/ErrorMessage';
import { useSearchKeyword } from './hooks/useSearchKeyword';
import { useNewsLoader } from './hooks/useNewsLoader';
import { ERROR_MESSAGE } from './constant/error';

const useApplySearchKeyword = (searchKeyword, setAppliedKeyword) => {
  const handleSearchApply = () => {
    setAppliedKeyword(searchKeyword);
  };
  return { handleSearchApply };
};

const renderErrorOrLoading = (state, timeoutOccurred) => {
  if (timeoutOccurred || state.error) return <ErrorMessage error={state.error || ERROR_MESSAGE.API.loading} />;
  if (state.loading) return <p className="loading">Loading...</p>;
  return null;
};

const Home = () => {
  const [page, setPage] = useState(1);
  const [appliedKeyword, setAppliedKeyword] = useState('');
  const [timeoutOccurred, setTimeoutOccurred] = useState(false);
  const { searchKeyword, handleSearchChange } = useSearchKeyword();
  const { state, loadNews } = useNewsLoader(page, appliedKeyword, setTimeoutOccurred);
  const { handleSearchApply } = useApplySearchKeyword(searchKeyword, setAppliedKeyword);

  useEffect(() => {
    if (!timeoutOccurred) loadNews();
  }, [page, appliedKeyword, timeoutOccurred, loadNews]);

  const errorOrLoading = renderErrorOrLoading(state, timeoutOccurred);
  if (errorOrLoading) return errorOrLoading;

  return (
    <div className="container">
      <h1 className="title">News List</h1>
      <SearchInput
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
        onSearchApply={handleSearchApply}
      />
      <NewsList news={state.news} />
      <Pagination currentPage={page} onPageChange={setPage} />
    </div>
  );
};

export default Home;
