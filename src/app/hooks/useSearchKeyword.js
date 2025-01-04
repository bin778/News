import { useState } from 'react';

export const useSearchKeyword = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearchChange = (e) => setSearchKeyword(e.target.value);
  return { searchKeyword, handleSearchChange };
};
