import { removeHtmlTagsRegex } from '../constant/regex.js';

export const removeHtmlTags = (text) => text.replace(removeHtmlTagsRegex, '');

export const filterNewsByKeyword = (news, keyword) => {
  if (!keyword) return news;
  return news.filter((item) => removeHtmlTags(item.title).toLowerCase().includes(keyword.toLowerCase()));
};
