import axios from 'axios';

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || 'Next.js';

  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/news.json', {
      params: {
        query,
        display: 100, // 뉴스 개수
        start: 1,
      },
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: '[ERROR] 뉴스를 불러오지 못했습니다.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
