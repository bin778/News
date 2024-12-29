import axios from 'axios';
import { ERROR_MESSAGE } from '@/constant/error.js';
import { jsonHeaders } from '@/constant/json.js';

const NAVER_API_URL = 'https://openapi.naver.com/v1/search/news.json';

const HEADERS = {
  'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
  'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
};

export const GET = async (req) => {
  const query = new URL(req.url).searchParams.get('query') || '뉴스';

  try {
    const { data } = await axios.get(NAVER_API_URL, {
      params: { query, display: 100, start: 1 },
      headers: HEADERS,
    });
    return new Response(JSON.stringify(data), { status: 200, headers: jsonHeaders });
  } catch (error) {
    console.error(`${ERROR_MESSAGE.API.call} ${error.message}`);
    return new Response(JSON.stringify({ error: ERROR_MESSAGE.API.fetch }), { status: 500, headers: jsonHeaders });
  }
};
