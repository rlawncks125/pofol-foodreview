<template>
  <div>
    <!-- 메인소개  -->
    <section
      class="relative bg-graident-animation w-full h-[50vw] min-h-[20rem] max-h-[70vh] my-2 overflow-hidden"
    >
      <!-- 텍스트 -->
      <p
        class="absolute text-white text-[1.5rem] font-bold top-[2rem] left-[1rem] z-[100]"
      >
        <span v-if="userInfo"> {{ userInfo.username }} 님 환영합니다. </span>
        <span v-else> 안녕하세요<br />테스트입니다 </span>
      </p>

      <!-- 이미지 -->
      <img
        src="https://res.cloudinary.com/dhdq4v4ar/image/upload/v1654624758/%ED%8F%AC%ED%94%841_isxw3h.jpg"
        class="absolute hidden sm:block right-4 top-4 w-[90vw] max-w-[24rem]"
      />

      <!-- 입장 버튼 -->
      <div
        class="btn-type-arrow !absolute left-4 bottom-4 text-[1rem] ml-1 !bg-blue-400"
        @click="moveFoodChat"
      >
        푸드 채팅 입장
      </div>
    </section>
    <section>
      <h2 class="text-center font-bold text-[2rem]">포트폴리오 소개</h2>
      <!-- 비디오 -->
      <div
        class="flex flex-col-reverse md:flex-row md:justify-between gap-2 px-2"
      >
        <!-- 타임라인 -->
        <div class="w-full md:w-[35vw] flex-initial px-2">
          <h2 class="text-center text-[1.5rem] font-bold">타임라인</h2>

          <ol class="border-l border-gray-300">
            <li v-for="(item, index) in videoTimeLine" :key="index">
              <div class="flex flex-start items-center pt-3">
                <div class="bg-gray-300 w-2 h-2 rounded-full -ml-1 mr-3"></div>
                <p
                  class="text-gray-500 text-sm cursor-pointer"
                  @click="setVideoTime(item.time)"
                >
                  {{ item.time }}
                </p>
              </div>
              <div class="mt-0.5 ml-4 mb-6">
                <h4 class="text-gray-800 font-semibold text-xl mb-1.5">
                  {{ item.title }}
                </h4>
                <template v-if="item.contents.length > 0">
                  <p
                    class="text-gray-500 mb-3"
                    v-for="(content, ci) in item.contents"
                    :key="ci"
                  >
                    {{ content }}
                  </p>
                </template>
              </div>
            </li>
          </ol>
        </div>
        <div class="flex-1">
          <video class="w-full px-2" ref="videoRef" controls>
            <source
              src="https://res.cloudinary.com/dhdq4v4ar/video/upload/v1675411794/foodreview_u2ifwz.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <div>설명 불라 불라</div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@/store/user";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import FoodReviewVideo from "@/assets/video/foodreview.mp4";

const router = useRouter();
const { userInfo } = storeToRefs(useUser());

const videoRef = ref<HTMLVideoElement>();

const moveFoodChat = () => {
  router.push("chat");
};

const setVideoTime = (time: string) => {
  const [min, sec] = time.split(":");
  const moveTime = +min * 60 + +sec;

  videoRef.value!.currentTime = moveTime;

  videoRef.value?.scrollIntoView({ behavior: "smooth" });

  // videoRef.value!.autoplay = true;
};

onMounted(() => {
  videoRef.value!.volume = 0.3;
});

interface TimeLineData {
  time: string;
  title: string;
  contents: string[];
}

const videoTimeLine: TimeLineData[] = [
  {
    time: "0:00",
    title: "회원가입",
    contents: ["한글 아이디와 영어아이디 두개다 할수 있도록 만들었습니다."],
  },
  {
    time: "0:21",
    title: "로그인",
    contents: [],
  },
  {
    time: "0:27",
    title: "방만들기",
    contents: [
      "- 지도를 클릭 또는 주소찻기로 마크를 새길수 있습니다.",
      "- 주소찾기 는 다음 주소 찾기를 이용했습니다.",
    ],
  },
  {
    time: "0:44",
    title: "방찾기",
    contents: [
      "검색조건",
      "- All 은 모든방",
      "- 방이름은 포함될시 ",
      "- 방장은 일치할시",
    ],
  },
  {
    time: "1:08",
    title: "음식점 등록",
    contents: [],
  },
  {
    time: "2:02",
    title: "레스토랑 댓글 CRUD",
    contents: ["ws를 이용하여 실시간 변경을 확인할수 있게하였습니다."],
  },
  {
    time: "2:42",
    title: "레스토랑 찾기",
    contents: [],
  },
  {
    time: "3:19",
    title: "대기 신청 수락",
    contents: [
      "참여 수락할시알람api를 이용하여 알람을 알리고 클릭시 방에 주소로 접근할수 있게했습니다",
    ],
  },
  {
    time: "3:42",
    title: "내정보 수정",
    contents: [],
  },
  {
    time: "4:11",
    title: "회원 탈퇴",
    contents: [],
  },
];
</script>

<style lang="scss" scoped>
.bg-graident-animation {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: graident-animation 10s ease infinite;
}

@keyframes graident-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
