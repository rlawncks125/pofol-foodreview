const cacheName = "v1.0.0.6";
// 캐시할 파일
const cacheList = [
  "/manifest.json",
  "/img/icons/icon_x512.png",
  "https://res.cloudinary.com/dhdq4v4ar/image/upload/v1664520185/dsdw_qmzwrd.png",
  "https://res.cloudinary.com/dhdq4v4ar/image/upload/v1654624758/%ED%8F%AC%ED%94%841_isxw3h.jpg",
  "https://res.cloudinary.com/dhdq4v4ar/video/upload/v1675411794/foodreview_u2ifwz.mp4",
];
// const cacheList = [];

self.addEventListener("install", (event) => {
  // 대기상태에 머무르지 않고 활성화
  // self.skipWaiting();
  console.log("install");

  // // 캐시 저장
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => cache.addAll(cacheList))
      .then(() => {
        self.skipWaiting();
      })
  );
});

self.addEventListener("activate", (event) => {
  console.log("activate");

  // 작업이 마무리될떄가지 설치단계를 연장
  event.waitUntil(
    // 불필요한 캐시 지우기
    caches
      .keys()
      .then((keylist) => {
        return Promise.all(
          keylist.map((key) => {
            if (key !== cacheName) {
              console.log("지움", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => {
        self.clients.claim();
      })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("fetch", event.request.url);

  const requestURL = new URL(event.request.url);

  // console.log("fetch", requestURL.pathname);

  // 서버로의 요청은 캐시 하지 않도록
  // GET 메소드 요청이 아닐시 캐시 하지 않도록
  if (event.request.url.includes("server") || event.request.method !== "GET") {
    return fetch(event.request);
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시된 응답이 있다면 제공
      if (response) {
        return response;
      }

      // 캐시된 응답이 없으면 네트워크 요청
      return fetch(event.request).then((networkResponse) => {
        console.log(event.request, networkResponse);
        // 네트워크 응답이 유효한 경우에만 캐시에 저장
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.headers.get("Content-Length") !== "0"
        ) {
          return caches.open(cacheName).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        } else {
          return networkResponse;
        }
      });
      // .catch(() => {
      //   // 네트워크 요청이 실패하면 대체 콘텐츠 제공 (옵션)
      //   if (event.request.destination === "document") {
      //     return caches.match("/offline.html");
      //   }
      // });
    })
  );
});

// 사이트에서 push 보내기 https://web-push-codelab.glitch.me/
// push 알람 처리
self.addEventListener("push", (event) => {
  // ex ) 받은 데이터 형식
  // {
  //  "title":"pwa 알람 테스트입니다",
  //  "body":"바디 ㅋㅋㅋ"
  //  "uuid" : "uuid"
  // }

  const data = JSON.parse(event.data.text());
  console.log(data);

  const title = data.title;
  const options = {
    body: data.body,
    icon: "https://res.cloudinary.com/dhdq4v4ar/image/upload/v1659106597/lakun_lx50mu.jpg",
    data,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  console.log(event);

  const roomUUID = event.notification.data.uuid;
  event.waitUntil(
    self.clients.openWindow(
      `https://foodreview.kimjuchan97.xyz/chat/room/${roomUUID}`
    )
  );
});
