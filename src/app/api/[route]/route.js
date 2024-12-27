import axios from 'axios';

const getFetchNews = async (query) => {
  return axios.get('https://openapi.naver.com/v1/search/news.json', {
    params: {
      query,
      display: 100,
      start: 1,
    },
    headers: {
      'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
      'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
    },
  });
};

const jsonHeaders = { 'Content-Type': 'application/json' };

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || 'Next.js';

  try {
    const response = await getFetchNews(query);
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: jsonHeaders,
    });
  } catch (error) {
    console.error('[ERROR] 뉴스 API 호출 실패: ', error.message);

    return new Response(JSON.stringify({ error: '[ERROR] 뉴스를 불러오지 못했습니다.' }), {
      status: 500,
      headers: jsonHeaders,
    });
  }
};
