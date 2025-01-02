export const fetchNews = async () => {
  const response = await fetch('/api/news?query=');
  const data = await response.json();
  return data.items || [];
};
