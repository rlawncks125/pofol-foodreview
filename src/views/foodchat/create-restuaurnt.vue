<template>
  <div>
    <file-upload
      ref="fileUploadRef"
      class="h-[70vw] w-[auto] mx-auto mb-[2rem] p-4 mo:h-[15rem] mo:w-[20rem]"
    />
  </div>
</template>

<script setup lang="ts">
import fileUpload from "@/components/file-upload.vue";
import { ref } from "vue";

const fileUploadRef = ref<InstanceType<typeof fileUpload>>();

const getImageUrl = async () => {
  const url = await fileUploadRef.value?.onUpload();

  return url;
};

defineExpose({
  getImageUrl,
});
</script>

<style scoped></style>
