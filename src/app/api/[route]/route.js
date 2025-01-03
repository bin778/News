import axios from 'axios';
import { jsonHeaders, apiURL, headers } from '@/app/constant/headers.js';
import { DATA } from '@/app/constant/data.js';

export const GET = async (req) => {
  const url = new URL(req.url);
  const query = url.searchParams.get('query') || '뉴스';
  const page = parseInt(url.searchParams.get('page')) || 1;
  const start = (page - 1) * DATA.NEWS.display + 1;

  try {
    const { data } = await axios.get(apiURL, {
      params: { query, display: DATA.NEWS.display, start },
      headers,
    });
    return new Response(JSON.stringify(data), { status: 200, headers: jsonHeaders });
  } catch (error) {
    const errorMessage = `뉴스 API 호출 실패: ${error.message}`;
    console.error(errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: jsonHeaders });
  }
};
