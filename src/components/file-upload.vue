<template>
  <div class="w-full h-64">
    <input
      id="dropzone-file"
      type="file"
      class="hidden"
      @change.prevent="onChangeFile"
    />
    <div class="flex justify-center items-center w-full h-full">
      <label
        v-if="!fileData"
        for="dropzone-file"
        class="flex flex-col justify-center items-center w-full h-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        @dragover="isDropzoneOver = true"
        @dragleave="isDropzoneOver = false"
        @drop="onDropFile"
      >
        <div
          class="flex flex-col justify-center items-center pt-5 pb-6 text-center pointer-events-none"
        >
          <div v-show="isDropzoneOver">
            <fa-icon icon="cloud-arrow-down" size="2x" class="text-gray-400" />
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Drop to upload</span>
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <div v-show="!isDropzoneOver">
            <fa-icon icon="cloud-arrow-up" size="2x" class="text-gray-400" />
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        </div>
      </label>
      <!-- 이미지 랜더 -->
      <div v-else class="w-full h-full">
        <img
          class="w-full h-full object-cover"
          :src="fileData.data.toString()"
          alt=""
        />
      </div>
    </div>
    <div v-show="fileData">
      <label
        for="dropzone-file"
        class="inline-block py-2.5 px-5 mr-2 mb-2 text-sm font-medium cursor-pointer text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >이미지 변경</label
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import FaIcon from "./fa-icon.vue";

const isDropzoneOver = ref(false);

const fileData = ref<{ file: File; data: string | ArrayBuffer }>();

const onDropFile = (e: any) => {
  const files = e.dataTransfer?.files;
  isDropzoneOver.value = false;
  // isLoading.value = true;
  // console.log(files);
  fileRender(files[0]);
  // isLoading.value = false;
};

const onChangeFile = (e: any) => {
  const files = e.target.files;
  // isLoading.value = true;
  fileRender(files[0]);
  // isLoading.value = false;
};
const fileRender = (file: any) => {
  // console.log(file);
  if (file.type.split("/")[0] !== "image") return;
  const reader = new FileReader();
  reader.onload = () => {
    if (reader.result) {
      fileData.value = {
        file,
        data: reader.result,
      };
    }
  };
  reader.readAsDataURL(file);
};

/**
 * 변환된 URL 주소 반환
 */
const onUpload = async (): Promise<string> => {
  const url = fileData.value?.file.name || "urlStrig";

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(url);
    }, 1000);
  });
};

const preventDefaultDrag = (e: any) => {
  e.preventDefault();
};
onMounted(() => {
  window.addEventListener("dragover", preventDefaultDrag);
  window.addEventListener("drop", preventDefaultDrag);
});
onUnmounted(() => {
  window.removeEventListener("dragover", preventDefaultDrag);
  window.removeEventListener("drop", preventDefaultDrag);
});

defineExpose({
  onUpload,
});
</script>

<style scoped></style>
