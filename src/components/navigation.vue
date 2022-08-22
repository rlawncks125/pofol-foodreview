<template>
  <div>
    <!-- 네비 토글 -->
    <label
      for="nav-toggle"
      class="hamburger__toggle z-[101] scale-[80%] absolute top-0 left-0"
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
      class="z-[100] absolute top-0 left-0 w-full sm:w-[35vw] border h-[100vh] bg-gray-400 transition-all duration-150"
      :class="isChecked ? 'translate-x-0' : 'translate-x-[-100%]'"
    >
      <p class="mt-[60px]"></p>
      <ul>
        <li>방목록</li>
        <li>방찾기</li>
        <li>내정보</li>
        <li>친구관리</li>
        <li>야간모드</li>
      </ul>
    </div>
    <p class="h-[60px] text-center text-[2rem]">navHome</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isChecked = ref(false);
</script>

<style scoped lang="scss">
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
