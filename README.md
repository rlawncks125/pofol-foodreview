# foodreview

# ViewRestaurant

- 메세지 유저 정보 swagger가 엉킹거같음 ( 같은 변수 네임 사용으로인한 에러 )
- 조치 :@ts-ignore주므로 에러 메세지 무시

# cypress 작성 목록

- [x]회원가입
- [x]로그인
- [x]방찾기
- [x]레스토랑 댓글 작성, 수정 , 대댓글 작성
- [x]내정보

# 직접 목록 ( 이미지 삽입 작업 , 알람 작업)

- 방만들기
- 음식점 만들기 ( 좌표를 찍을수 없음 , 이미지 삽입 못함 )
- 레스토랑 댓글 삭제
- 대기신청 수락 , 강퇴
- 레스토랑 찾기

# 할작업

- [x]탈퇴작업
- [x]메인 네비 로그아웃

# 모바일

- 실시간 댓글 작성, 수정 ,대댓글 작업
- 방 허락 알람

# CloudeFlare 배포 문제

## Proxy시 외부 도메인 안됌

https://developers.cloudflare.com/pages/configuration/redirects/#proxying

### 해결

프록시 -> Axios baseURL 설정
