<template>
  <div class="popup-style">
    <div class="content-wrap">
      <FaIcon @click="onClose" class="close" icon="ban" size="2x" />
      <div class="content">
        <h2 class="text-[2rem] text-center">레스토랑 찾기</h2>
        <div class="flex">
          <select
            class="select-arrow text-left flex-shrink-0 z-10 cursor-pointer inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 focus:outline-none"
            name=""
            id="search-type"
            v-model="searchType"
          >
            <option :value="key" :key="key" v-for="(value, key) in EsearchType">
              {{ key }}
            </option>
          </select>
          <div class="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 focus:outline-none"
              placeholder="Search"
              required
              v-model="findText"
              @keydown="
                (e) => {
                  if (e.key === 'Enter') onSearch();
                  return;
                }
              "
            />
            <button
              type="submit"
              class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border-2 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="onSearch"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <!--  -->

        <div v-if="restaurantList">
          <div v-for="(restaurant, index) in restaurantList" :key="index">
            {{ restaurant.restaurantName }}
          </div>
        </div>
        <h2 class="font-bold text-[2rem]">찾음</h2>

        <div
          v-for="restaurant in filterRestaurant"
          :key="restaurant.id"
          class="border p-2 cursor-pointer"
          @click="onSelectRestaurantByid(restaurant.id)"
        >
          <p>음식점 : {{ restaurant.restaurantName }}</p>
          <p>지역 : {{ restaurant.location }}</p>
          <div>분야 : {{ restaurant.specialization }}</div>
          <div>해시태그 : {{ restaurant.hashTags }}</div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Restaurant } from "@/assets/swagger";
import { ref } from "vue";

import FaIcon from "../fa-icon.vue";

const props = defineProps({
  restaurantList: Object as () => Restaurant[],
});
const emits = defineEmits(["close", "select"]);

enum EsearchType {
  "레스토랑 이름" = "restaurantName",
  "해시 태그" = "hashTags",
  "지역" = "location",
  "전문 분야" = "specialization",
}
const searchType = ref<keyof typeof EsearchType>("레스토랑 이름");
const findText = ref("");

const filterRestaurant = ref<Restaurant[]>([]);

const onSearch = () => {
  const filterList = props.restaurantList?.filter((v) => {
    switch (searchType.value) {
      case "레스토랑 이름":
        return v.restaurantName.includes(findText.value);
      case "지역":
        return v.location.includes(findText.value);
      case "해시 태그":
        return v.hashTags.find((v) => v.includes(findText.value));
      case "전문 분야":
        return v.specialization.find((v) => v.includes(findText.value));
      default:
        return false;
    }
  });

  console.log(filterList);
  filterRestaurant.value = filterList!;
  findText.value = "";
};
// const { restaurantList } = toRefs(porps);

const onSelectRestaurantByid = (id: number) => {
  emits("select", id);
  emits("close");
};

const onClose = () => {
  emits("close");
};
</script>

<style scoped lang="scss">
.select-arrow {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  @apply pr-[2rem];
}
</style>
