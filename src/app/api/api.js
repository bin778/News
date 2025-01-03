export const fetchNews = async (page, query = '뉴스') => {
  const response = await fetch(`/api/route?query=${query}&page=${page}`);
  const data = await response.json();
  return data.items || [];
};
