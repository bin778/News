export const filterByTitle = (newsItems, keyword) => {
  if (!keyword) return newsItems;
  return newsItems.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));
};
