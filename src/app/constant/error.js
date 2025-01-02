'use client';
const ERROR_FLAG = '[ERROR]';

export const ERROR_MESSAGE = Object.freeze({
  API: Object.freeze({
    call: `${ERROR_FLAG} 뉴스 API 호출 실패: `,
    fetch: `${ERROR_FLAG} 뉴스를 불러오지 못했습니다.`,
  }),
});
