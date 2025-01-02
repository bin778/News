import axios from 'axios';
import { jsonHeaders, apiURL, headers } from '@/app/constant/headers.js';
import { DATA } from '@/app/constant/data.js';

export const GET = async (req) => {
  const query = new URL(req.url).searchParams.get('query') || '뉴스';
  try {
    const { data } = await axios.get(apiURL, {
      params: { query, display: DATA.NEWS.display, start: DATA.NEWS.start },
      headers: headers,
    });
    return new Response(JSON.stringify(data), { status: 200, headers: jsonHeaders });
  } catch (error) {
    const errorMessage = `뉴스 API 호출 실패: ${error.message}`;
    console.log(errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers: jsonHeaders });
  }
};
