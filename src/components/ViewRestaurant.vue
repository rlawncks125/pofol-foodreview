<template>
  <div v-if="restaurant" class="popup-style">
    <div class="content-wrap max-w-container lg:!mx-auto">
      <FaIcon @click="onClose" class="close" icon="ban" size="2x" />
      <div class="clear-both text-center pt-4 pb-2 text-[1.8rem] font-bold">
        {{ restaurant.restaurantName }}
      </div>
      <!-- 레스토랑 이미지 -->
      <div
        class="h-[40vw] max-h-[25rem] translate-x-[-.5rem]"
        :style="{ width: 'calc(100% + 1rem)' }"
      >
        <div
          v-if="!restaurant.restaurantImageUrl"
          class="bg-yellow-100 h-full flex justify-center items-center flex-col"
        >
          <FaIcon icon="cloud-arrow-down" size="3x" />
          <p>이미지가 없습니다.</p>
        </div>
        <div v-else>
          <p>이미지 삽입</p>
        </div>
      </div>
      <!-- 삭제하기 버튼 -->
      <button
        v-if="props?.isSuperUser"
        class="border p-2 my-2 bg-red-600 text-white"
        @click="onDeleteRestaurant"
      >
        삭제 하기
      </button>
      <!-- 콘텐츠 -->
      <div class="content">
        <p>{{ restaurant.hashTags }}</p>
        <p>{{ restaurant.specialization }}</p>
        <p>{{ restaurant.location }}</p>
        <!-- 댓글 -->
        <div v-for="comment in restaurant.comments" :key="comment.id">
          <div class="border">
            <div>
              <div
                class="cursor-pointer"
                @click="openAdditionalComment(comment.id)"
              >
                <div class="flex gap-2">
                  <span>
                    {{ comment.message.userInfo.nickName }}
                  </span>

                  <span>
                    {{ new Date(comment.message.CreateTime).toLocaleString() }}
                  </span>
                </div>
                <div>
                  {{ comment.message.message }}
                </div>
              </div>
              <!-- 댓글 수정 & 삭제 버튼  -->
              <div
                v-if="comment.message.userInfo.nickName === userInfo?.username"
              >
                <button
                  @click="openEditCommnet(comment.id)"
                  class="border bg-blue-600 text-white p-2"
                >
                  수정하기
                </button>
                <button
                  @click="onDeleteCommnet(comment.id)"
                  class="border bg-red-600 text-white p-2"
                >
                  삭제 하기
                </button>
              </div>

              <!-- 추가 댓글 달기 -->
              <div
                v-show="openAddCommentId === comment.id"
                class="border mx-4 py-2"
              >
                <label for="additional-comments">추가 댓글</label>
                <input
                  class="border"
                  type="text"
                  name=""
                  id="additional-comments"
                  v-model="additionalComment"
                />
                <button
                  class="mx-2 bg-blue-500 text-white p-2"
                  @click="onAddAdditionalComment"
                >
                  추가 댓글 달기
                </button>
              </div>
              <!-- 댓글 수정  -->
              <div v-show="openEditCommnetId === comment.id">
                <label for="edit-commnet">수정할 내용 :</label>
                <input
                  class="border"
                  type="text"
                  name=""
                  id="edit-commnet"
                  v-model="editCommnetText"
                />
                <button
                  class="border bg-blue-400 text-white p-2"
                  @click="onEditCommnet"
                >
                  수정하기
                </button>
              </div>
              <!-- 추가 댓글 랜더 -->
              <div
                class="border mx-4"
                v-for="childComment in comment.childMessages"
                :key="childComment.CreateTime + ''"
              >
                <div>
                  <div class="flex gap-2">
                    <span>
                      {{ childComment.userInfo.nickName }}
                    </span>
                    <span>
                      {{ new Date(childComment.CreateTime).toLocaleString() }}
                    </span>
                  </div>

                  <p>
                    {{ childComment.message }}
                  </p>
                </div>
                <!-- 추가댓글 수정 -->
                <div
                  class="border"
                  v-show="
                    editAdditionalCommentByCommentId === comment.id &&
                    editAdditionalCommentByCreateTime ===
                      childComment.CreateTime
                  "
                >
                  <label for="edit-additional-commnet">수정할 텍스트 :</label>
                  <input
                    class="border"
                    type="text"
                    name=""
                    id="edit-additional-commnet"
                    v-model="editAdditionalCommnetText"
                  />
                  <button
                    @click="onEditAdditionalComment"
                    class="border bg-blue-400 text-white p-2"
                  >
                    수정하기
                  </button>
                </div>
                <!-- 추가댓글 수정 & 삭제 버튼 -->
                <div
                  v-if="userInfo?.username === childComment.userInfo.nickName"
                >
                  <button
                    @click="
                      openEditAdditionalComment(
                        comment.id,
                        childComment.CreateTime
                      )
                    "
                    class="p-2 text-white m-1 bg-blue-500"
                  >
                    수정 버튼
                  </button>
                  <button
                    @click="
                      onDelteAdditionalComment(
                        comment.id,
                        childComment.CreateTime
                      )
                    "
                    class="p-2 text-white m-1 bg-red-500"
                  >
                    삭제 버튼
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 별점 추가하기 -->
        <h2 class="my-2 text-[1.5rem]">답글</h2>
        <textarea
          ref="textareaRef"
          class="border w-full"
          name=""
          id=""
          @input="textareaAutoHieght"
        ></textarea>
        <button class="bg-blue-400 text-white p-2" @click="onAddComment">
          답글 달기
        </button>

        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  addMessageByCommentId,
  addRestaurantCommentById,
  deleteRestaurant,
  deleteCommentChildMessage,
  editCommentChildMessage,
  editCommentMessage,
  deleteComment,
} from "@/api/Restaurant";
import {
  EnumAddMessageByCommentIdInPutDtoRole,
  EnumAddRestaurantCommentByIdIdInputDtoRole,
  Restaurant,
} from "@/assets/swagger";
import { useLoading } from "@/store/loading";
import { useUser } from "@/store/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import FaIcon from "./fa-icon.vue";

const props = defineProps({
  isSuperUser: Boolean,
});

const { userInfo } = storeToRefs(useUser());
const emits = defineEmits(["close", "delete", "upateComment"]);

const restaurant = ref<Restaurant>();

// 댓글 추가
const textareaRef = ref<HTMLTextAreaElement>();

const textareaAutoHieght = (e: any) => {
  textareaRef.value!.style.height = "auto";
  const scrollHeight = textareaRef.value!.scrollHeight + 4;
  textareaRef.value!.style.height = scrollHeight + "px";
};

const onAddComment = async () => {
  console.log(textareaRef.value!.value);

  if (textareaRef.value!.value === "") return;

  useLoading().on();
  const { ok } = await addRestaurantCommentById({
    message: textareaRef.value!.value,
    restaurantId: restaurant.value!.id,
    role: EnumAddRestaurantCommentByIdIdInputDtoRole.User,
    star: 4,
  });

  if (ok) {
    textareaRef.value!.value = "";
    emits("upateComment", restaurant.value!.id);
  }
  useLoading().off();
};

// 댓글 변경
const openEditCommnetId = ref();
const editCommnetText = ref();

const openEditCommnet = (id: number) => {
  if (openEditCommnetId.value === id) {
    openEditCommnetId.value = undefined;
    return;
  }

  openEditCommnetId.value = id;
  editCommnetText.value = "";
};

const onEditCommnet = async () => {
  console.log(openEditCommnetId.value, editCommnetText.value);

  useLoading().on();
  const { ok } = await editCommentMessage({
    id: openEditCommnetId.value,
    message: editCommnetText.value,
  });

  if (ok) {
    openEditCommnetId.value = undefined;
    editCommnetText.value = "";
    emits("upateComment", restaurant.value!.id);
  }
  useLoading().off();
};

// 댓글 삭제
const onDeleteCommnet = async (id: number) => {
  if (!confirm("정말로 삭제하시겠습니까?")) return;

  useLoading().on();

  const { ok } = await deleteComment(id);

  if (ok) {
    emits("upateComment", restaurant.value!.id);
  }
  useLoading().off();
};

// 추가 댓글 추가
const openAddCommentId = ref();
const additionalComment = ref();

const openAdditionalComment = (commnetId: any) => {
  if (openAddCommentId.value === commnetId) {
    openAddCommentId.value = "";
    return;
  }
  additionalComment.value = "";
  openAddCommentId.value = commnetId;
};

const onAddAdditionalComment = async () => {
  useLoading().on();

  const { ok } = await addMessageByCommentId({
    commentId: openAddCommentId.value,
    message: additionalComment.value,
    role: EnumAddMessageByCommentIdInPutDtoRole.User,
  });

  if (ok) {
    openAddCommentId.value = "";
    additionalComment.value = "";
    emits("upateComment", restaurant.value!.id);
  }
  useLoading().off();

  console.log(openAddCommentId.value, additionalComment.value);
};

// 추가 댓글 변경
const editAdditionalCommentByCommentId = ref<number>();
const editAdditionalCommentByCreateTime = ref<Date>();
const editAdditionalCommnetText = ref();

const openEditAdditionalComment = (commnetId: number, CreateTime: Date) => {
  console.log(commnetId, CreateTime);
  if (editAdditionalCommentByCommentId.value === commnetId) {
    editAdditionalCommentByCommentId.value = undefined;
    editAdditionalCommentByCreateTime.value = undefined;
    return;
  }

  editAdditionalCommentByCommentId.value = commnetId;
  editAdditionalCommentByCreateTime.value = CreateTime;
  editAdditionalCommnetText.value = "";
};

const onEditAdditionalComment = async () => {
  if (
    !editAdditionalCommentByCommentId.value ||
    !editAdditionalCommentByCreateTime.value
  )
    return;

  useLoading().on();
  const { ok } = await editCommentChildMessage({
    id: editAdditionalCommentByCommentId.value,
    createTime: editAdditionalCommentByCreateTime.value,
    message: editAdditionalCommnetText.value,
  });

  if (ok) {
    editAdditionalCommentByCommentId.value = undefined;
    editAdditionalCommentByCreateTime.value = undefined;
    emits("upateComment", restaurant.value!.id);
  }

  useLoading().off();
};

/** 추가 댓글 삭제 */
const onDelteAdditionalComment = async (
  commentId: number,
  CreateTime: Date
) => {
  if (!confirm("정말로 삭제하겠습니까?")) return;

  useLoading().on();
  const { ok } = await deleteCommentChildMessage({
    CreateTime,
    id: commentId,
  });

  if (ok) {
    emits("upateComment", restaurant.value!.id);
  }
  useLoading().off();

  console.log(commentId, CreateTime);
};

/** 레스토랑 삭제 */
const onDeleteRestaurant = async () => {
  if (!restaurant.value) return;

  if (!confirm("정말로 삭제하시겠습니까?")) return;

  useLoading().on();
  const { ok } = await deleteRestaurant(restaurant.value.id);

  if (ok) {
    emits("delete", restaurant.value);
  }
  useLoading().off();
};

const onClose = () => {
  emits("close", true);
};

const setInfo = (_restaurant: Restaurant) => {
  console.log(_restaurant);
  _restaurant.comments.sort((a, b) => {
    return new Date(a.createAt).getTime() - new Date(b.createAt).getTime();
  });
  restaurant.value = _restaurant;
};

defineExpose({
  setInfo,
});
</script>

<style scoped lang="scss">
.popup-style {
  @apply absolute inset-0 bg-black bg-opacity-60 z-[1000];

  .content-wrap {
    @apply m-4 bg-white px-2 py-4 overflow-auto rounded-2xl overflow-x-hidden;
    max-height: calc(100vh - 2rem);
    .close {
      @apply cursor-pointer float-right mt-[1rem] mr-[1rem] hover:text-red-600;
    }

    .content {
      @apply px-4  clear-both;
    }
  }
}
</style>
