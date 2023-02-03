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
    <div class="flex flex-col items-center md:self-start">
      <img
        class="border rounded-full w-[150px] h-[150px] object-cover object-center mb-4"
        :src="input.avatarUrl ? input.avatarUrl : nullAvatar"
        alt=""
      />
      <div class="flex gap-2">
        <button @click="onRandomImage" class="btn-type-0">랜덤 이미지</button>
        <label for="dropzone-file" class="btn-type-0 cursor-pointer"
          >이미지 변경</label
        >
      </div>
      <div class="flex gap-2 my-2">
        <label for="theme" class="label-type-0">테마</label>
        <input type="color" name="" id="theme" v-model="input.theme" />
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
          class="input-type-0 disabled:cursor-not-allowed"
          v-model="input.username"
          disabled
        />
      </div>
      <div class="my-1">
        <label for="user-dsc" class="label-type-0">소개</label>
        <textarea
          ref="textareaRef"
          @input="textareaAutoHieght"
          type="text"
          name=""
          id="user-dsc"
          class="input-type-0"
          v-model="input.dsc"
        />
      </div>
      <div class="my-2 flex justify-between gap-1">
        <button class="btn-type-0" @click="onEdituser">저장</button>
        <!-- 아이디 삭제 Modal 버튼 -->
        <button
          type="button"
          class="px-6 py-2.5 bg-red-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-toggle="modal"
          data-bs-target="#userDeleteModal"
          @click="input.deleteUser = ''"
        >
          아이디 삭제하기
        </button>
      </div>

      <!-- 아이디 삭제 Modal -->
      <div
        class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="userDeleteModal"
        tabindex="-1"
        aria-labelledby="userDeleteModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog relative w-auto pointer-events-none">
          <div
            class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
          >
            <div
              class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
            >
              <h5
                class="text-xl font-medium leading-normal text-gray-800"
                id="userDeleteModalLabel"
              >
                정말로 아이디를 삭제하실겠습니까??
              </h5>
              <button
                type="button"
                class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body flex flex-col relative p-4">
              <p>
                삭제하실 거라면
                <span class="text-red-500">{{ userInfo?.username }}</span
                >를 입력하세요
              </p>
              <input
                class="border"
                type="text"
                name=""
                id=""
                v-model="input.deleteUser"
              />
            </div>
            <div
              class="modal-footer gap-1 flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
            >
              <button
                type="button"
                class="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1 disabled:bg-gray-400"
                @click="deleteUser"
                :disabled="input.deleteUser !== userInfo?.username"
              >
                삭제하기
              </button>
              <button
                type="button"
                class="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "@/store/user";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import { nullAvatar } from "@/common/imageUrl";
import { useLoading } from "@/store/loading";
import { getImageURLByFormData } from "@/api/file";
import { editUser } from "@/api/auth";
import { useRouter } from "vue-router";

const { userInfo } = storeToRefs(useUser());
const router = useRouter();

const input = reactive({
  avatarUrl: userInfo.value?.avatar,
  username: userInfo.value?.username || "",
  dsc: userInfo.value?.dsc || "",
  theme: userInfo.value?.theme || "#93C5FD",
  deleteUser: "",
});

const fileData = ref<File>();

const textareaRef = ref<HTMLTextAreaElement>();

const textareaAutoHieght = () => {
  textareaRef.value!.style.height = "auto";
  const scrollHeight = textareaRef.value!.scrollHeight + 4;
  textareaRef.value!.style.height = scrollHeight + "px";
};

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
    theme: input.theme,
  });

  if (ok) {
    useUser().updateInfo(user);
  }

  useLoading().off();
};

const deleteUser = async (e: any) => {
  if (input.deleteUser !== userInfo.value?.username) return;

  useLoading().on();
  const closeBtn = (e.target as HTMLElement).parentNode
    ?.childNodes[1] as HTMLButtonElement;

  closeBtn?.click();

  await useUser().userDelete();

  useLoading().off();

  router.push("/");
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

onMounted(() => {
  textareaAutoHieght();
});
</script>

<style scoped></style>
