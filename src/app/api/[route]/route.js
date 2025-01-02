import axios from 'axios';
import { ERROR_MESSAGE } from '@/app/constant/error.js';
import { jsonHeaders, apiURL, headers } from '@/app/constant/headers.js';

export const GET = async (req) => {
  const query = new URL(req.url).searchParams.get('query') || '뉴스';

  try {
    const { data } = await axios.get(apiURL, {
      params: { query, display: 100, start: 1 },
      headers: headers,
    });
    return new Response(JSON.stringify(data), { status: 200, headers: jsonHeaders });
  } catch (error) {
    console.error(`${ERROR_MESSAGE.API.call} ${error.message}`);
    return new Response(JSON.stringify({ error: ERROR_MESSAGE.API.fetch }), { status: 500, headers: jsonHeaders });
  }
};
