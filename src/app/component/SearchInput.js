export const SearchInput = ({ searchKeyword, onSearchChange, onSearchApply }) => (
  <div className="searchContainer">
    <input
      type="text"
      placeholder="검색어를 입력하세요"
      value={searchKeyword}
      onChange={onSearchChange}
      onKeyDown={(e) => e.key === 'Enter' && onSearchApply()}
      className="searchInput"
    />
    <button onClick={onSearchApply} className="searchButton">
      검색
    </button>
  </div>
);
