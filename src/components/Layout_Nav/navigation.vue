<template>
  <div>
    <!-- 네비hanburger 토글 -->
    <label
      for="nav-toggle"
      class="hamburger__toggle md:!hidden cursor-pointer z-[1101] scale-[80%] absolute top-0 left-0"
    >
      <input
        class="toggle-checked w-0 h-0"
        type="checkbox"
        name=""
        id="nav-toggle"
        v-model="isChecked"
      />
      <span class="hamburger__icon"></span>
    </label>

    <div
      class="md:hidden z-[1100] w-full absolute top-0 bottom-0 left-0 sm:w-[35vw] bg-blue-300 dark:bg-blue-900 transition-all duration-150 shadow-2xl"
      :class="isChecked ? 'translate-x-0' : 'translate-x-[-100%]'"
    >
      <h2 v-if="userInfo" class="float-right p-4 font-bold">
        <span class="text-white dark:text-blue-300">
          {{ userInfo.username }}
        </span>
        님 환영합니다.
      </h2>

      <p class="mt-[60px]"></p>
      <ul class="menu-list p-2">
        <li v-show="!token">
          <router-link to="/login" @click="isChecked = false">
            로그인
          </router-link>
        </li>
        <li v-show="!token">
          <router-link to="/join" @click="isChecked = false">
            회원가입
          </router-link>
        </li>

        <li v-show="token" @click="onLogOut">
          <p>로그아웃</p>
        </li>

        <li @click="changeDarkmode" class="flex items-center">
          <p>야간모드</p>
          <div
            class="!h-[4rem] !w-[4rem] !flex !items-center pointer-events-none"
          >
            <fa-icon
              v-if="isDarkMode"
              icon="sun"
              size="xs"
              class="text-red-400"
            />
            <fa-icon v-else icon="moon" size="xs" class="text-yellow-300" />
          </div>
        </li>
        <li>
          <SubNotifi />
        </li>
        <!-- <li>
          <a
            :href="
              isMobile()
                ? 'market://launch?id=xyz.kimjuchan97.food.twa'
                : 'https://play.google.com/store/apps/details?id=xyz.kimjuchan97.food.twa'
            "
          >
            구글 앱
          </a>
        </li> -->
      </ul>
    </div>
    <!-- <div class="h-[5rem] text-center text-[2rem]"> -->
    <div class="flex justify-between md:px-[1rem] items-center">
      <!-- 로고 -->
      <router-link to="/" class="w-[8rem] h-full block mx-auto md:mx-0">
        <img
          class="h-full w-full object-cover mx-auto"
          src="https://res.cloudinary.com/dhdq4v4ar/image/upload/v1664520185/dsdw_qmzwrd.png"
          alt="로고이미지"
        />
      </router-link>
      <div class="hidden md:block">
        <ul class="item-list flex gap-1">
          <!-- <li>
            <a
              :href="
                isMobile()
                  ? 'market://launch?id=xyz.kimjuchan97.food.twa'
                  : 'https://play.google.com/store/apps/details?id=xyz.kimjuchan97.food.twa'
              "
              target="_blank"
            >
              구글앱
            </a>
          </li> -->

          <li v-show="!token" @click="router.push('login')">로그인</li>
          <li v-show="!token" @click="router.push('join')">회원가입</li>
          <li v-show="token" @click="onLogOut">로그아웃</li>
          <li @click="changeDarkmode" class="!px-[1rem]">
            <fa-icon
              v-if="isDarkMode"
              icon="sun"
              size="1x"
              class="text-red-400"
            />
            <fa-icon v-else icon="moon" size="1x" class="text-yellow-300" />
          </li>
          <li class="!rounded-full">
            <SubNotifi />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useDarkmode } from "@/common/darkmode";
import FaIcon from "@/components/fa-icon.vue";
import { useRouter } from "vue-router";
import { useUser } from "@/store/user";
import { testUser } from "@/api/auth";
import { storeToRefs } from "pinia";
import SubNotifi from "@/components/subscription-notification.vue";
import { isMobile } from "@/utils/device";

const router = useRouter();
const { isDarkMode, changeDarkmode } = useDarkmode();

const { token, userInfo } = storeToRefs(useUser());
const { userLogOut } = useUser();

const isChecked = ref(false);

const onLogOut = () => {
  userLogOut();
  router.push("/");
};
</script>

<style scoped lang="scss">
.menu-list {
  li {
    cursor: pointer;
    border-bottom: 1px solid black;

    // router-link
    * {
      @apply block py-[1rem] w-full h-full;
    }

    @apply text-gray-900 hover:text-white dark:hover:text-blue-300 dark:text-white;
  }
}

.item-list {
  li {
    @apply border p-2 rounded-xl bg-blue-400 dark:bg-blue-700 text-white cursor-pointer;
    @apply text-white font-bold;

    &:hover {
      @apply scale-105 bg-blue-500;
      transition: transform 0.1s;
    }
  }
}

.hamburger__toggle {
  display: inline-block;
  width: 60px;
  height: 60px;
  background-color: #3d3d3d;
  border-radius: 50%;
  border: none;
}

/* give the span element and related pseudo-elements the appearance of white lines */
.hamburger__icon,
.hamburger__icon::before,
.hamburger__icon::after {
  position: absolute;
  width: 30px;
  height: 2px;
  border-radius: 4px;
  background-color: white;
}

/* center the span element in the middle of its containing button */
.hamburger__icon {
  top: calc(50% - 2px);
  left: calc(50% - 15px);
}

/* position the two pseudo-elements to the very left */
.hamburger__icon::before,
.hamburger__icon::after {
  content: "";
  left: 0;
}

/* this is the top dash of the hamburger */
.hamburger__icon::before {
  bottom: 8px;
}

/* this is the bottom dash of the hamburger */
.hamburger__icon::after {
  top: 8px;
}

/* rotate middle dash of hamburger */
.toggle-checked:checked ~ .hamburger__icon {
  width: 50px;
  height: 4px;
  left: 5px;
  top: calc(50% - 2px);
  transform: rotate(-45deg);
  @apply bg-green-400;
}

/* rotate bottom dash of hamburger counter clockwise */
.toggle-checked:checked ~ .hamburger__icon::after {
  width: 50px;
  height: 4px;
  top: -1px;
  transform: rotate(-270deg);
  @apply bg-green-400;
}

/* hide the top dash by scaling it to 0 */
.toggle-checked:checked ~ .hamburger__icon::before {
  transform: scale(0);
}

/* TRANSITION */
/* adjust duration to see it happen slower */
.hamburger__icon,
.hamburger__icon::after {
  transition: all 0.2s linear;
}
</style>
