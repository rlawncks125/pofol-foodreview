<template>
  <!-- 깃허브 -->
  <input
    id="dropzone-file"
    type="file"
    class="hidden"
    accept="image/*"
    @change.prevent="onChangeFile"
  />
  <h2 class="text-center text-[2rem] mb-[1rem]">내정보</h2>
  <div
    class="flex flex-col md:flex-row items-center justify-center gap-4 h-full center max-w-container mx-auto px-4"
  >
    <!-- 이미지 -->
    <div class="flex flex-col items-center">
      <img
        class="border rounded-full w-[150px] h-[150px] object-cover object-center"
        :src="input.avatarUrl ? input.avatarUrl : nullAvatar"
        alt=""
      />
      <div class="flex gap-2">
        <button @click="onRandomImage" class="btn-type-0">랜덤 이미지</button>
        <label for="dropzone-file" class="btn-type-0 cursor-pointer"
          >이미지 변경</label
        >
      </div>
    </div>
    <!-- 내용 -->
    <div class="pt-4 w-[100%] md:w-[50%]">
      <div class="my-1">
        <label for="user-nickname" class="label-type-0">닉네임</label>
        <input
          type="text"
          name=""
          id="user-nickname"
          class="input-type-0"
          v-model="input.username"
        />
      </div>
      <div class="my-1">
        <label for="user-dsc" class="label-type-0">dsc</label>
        <input
          type="text"
          name=""
          id="user-dsc"
          class="input-type-0"
          v-model="input.dsc"
        />
      </div>
    </div>

    <button class="btn-type-0 self-end" @click="onEdituser">저장</button>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@/store/user";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { nullAvatar } from "@/common/imageUrl";
import { useLoading } from "@/store/loading";
import { getImageURLByFormData } from "@/api/file";
import { editUser } from "@/api/auth";
import { User } from "@/assets/swagger";

const { userInfo } = storeToRefs(useUser());

const input = reactive({
  avatarUrl: userInfo.value?.avatar,
  username: userInfo.value?.username || "",
  dsc: userInfo.value?.dsc || "",
});

const fileData = ref<File>();

const onRandomImage = () => {
  const randomId = getRandomValue(0, 70);
  input.avatarUrl = `https://i.pravatar.cc/300?img=${randomId}`;
  // 파일 데이터 초기화
  fileData.value = undefined;
};

const onChangeFile = (e: any) => {
  const files = e.target.files;

  fileRender(files[0]);
};

const onEdituser = async () => {
  useLoading().on();

  // console.log(fileData.value);
  // console.log(input);

  let avatar = input.avatarUrl;

  if (fileData.value) {
    const form = new FormData();
    const file = fileData.value;

    form.append("file", file, file.name);
    avatar = await getImageURLByFormData(form);
  }

  const { ok, user } = await editUser({
    avatar,
    dsc: input.dsc,
  });

  if (ok) {
    useUser().updateInfo(user);
  }

  useLoading().off();
};

function fileRender(file: any) {
  // console.log(file);
  if (file.type.split("/")[0] !== "image") return;
  const reader = new FileReader();
  reader.onload = () => {
    if (reader.result) {
      fileData.value = file;
      //  @ts-ignore
      input.avatarUrl = reader.result;
    }
  };
  reader.readAsDataURL(file);
}

function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
</script>

<style scoped></style>
