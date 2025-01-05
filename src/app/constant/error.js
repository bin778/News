const ERROR_FLAG = 'ERROR!';
export const ERROR_MESSAGE = Object.freeze({
  API: Object.freeze({
    fetch: `${ERROR_FLAG} 뉴스를 불러오는 중 에러가 발생하였습니다!`,
    loading: `${ERROR_FLAG} 사용자 요청 시간이 초과되었습니다!`,
  }),
});
