import axios from 'axios';
import { jsonHeaders, apiURL, headers } from '@/app/constant/headers.js';
import { DATA } from '@/app/constant/data.js';

const buildQueryParams = (query, page) => {
  const start = (page - 1) * DATA.NEWS.display + 1;
  return { query, display: DATA.NEWS.display, start };
};

const handleApiError = (error) => {
  const errorMessage = `뉴스 API 호출 실패: ${error.message}`;
  console.error(errorMessage);
  return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: jsonHeaders });
};

export const GET = async (req) => {
  const url = new URL(req.url);
  const query = url.searchParams.get('query') || DATA.QUERY.keyword;
  const page = parseInt(url.searchParams.get('page')) || DATA.QUERY.page;

  try {
    const { data } = await axios.get(apiURL, {
      params: buildQueryParams(query, page),
      headers,
    });
    return new Response(JSON.stringify(data), { status: 200, headers: jsonHeaders });
  } catch (error) {
    return handleApiError(error);
  }
};
