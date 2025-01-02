import { useState } from 'react';

export const useSearchKeyword = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [applyKeyword, setApplyKeyword] = useState('');

  const handleSearchChange = (e) => setSearchKeyword(e.target.value);
  const handleSearchApply = () => setApplyKeyword(searchKeyword);

  return { searchKeyword, applyKeyword, handleSearchChange, handleSearchApply };
};
