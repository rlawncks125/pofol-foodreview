<template>
  <div v-if="restaurant" class="popup-style-view">
    <div class="content-wrap max-w-form md:!mx-auto">
      <div class="flex items-center bg-yellow-300 sticky top-0 z-[100]">
        <div
          class="text-center flex-1 pl-[32px] font-bold text-[1.8rem] xs:py-4"
        >
          {{ restaurant.restaurantName }}
        </div>
        <FaIcon
          @click="onClose"
          class="cursor-pointer mr-[1rem] hover:text-red-600"
          icon="ban"
          size="2x"
        />
      </div>
      <!-- 레스토랑 이미지 -->
      <div class="translate-x-[-.5rem]" :style="{ width: 'calc(100% + 1rem)' }">
        <div
          v-if="!restaurant.restaurantImageUrl"
          class="h-[40vw] max-h-[25rem] bg-yellow-100 flex justify-center items-center flex-col"
        >
          <FaIcon icon="cloud-arrow-down" size="3x" />
          <p>이미지가 없습니다.</p>
          <p>기본 이미지 추가하기</p>
        </div>
        <div class="overflow-hidden w-full h-full" v-else>
          <img
            :src="
              restaurant.restaurantImageUrl.replace(
                /upload\//g,
                '$&w_350,h_200/'
              )
            "
            alt="레스토랑 이미지"
            class="w-full object-cover"
          />
        </div>
      </div>
      <!-- 음식점 삭제하기 버튼 -->
      <button
        v-if="props?.isSuperUser"
        class="btn-type-remove my-2 mx-2"
        @click="onDeleteRestaurant"
      >
        삭제 하기
      </button>
      <!-- 평균 별점 -->
      <StarFill :fill="restaurant.avgStar" :star-size="2" :star-num="5" />
      <!-- 콘텐츠 -->
      <div class="content px-2">
        <p>{{ restaurant.hashTags }}</p>
        <p>{{ restaurant.specialization }}</p>
        <p>{{ restaurant.location }}</p>
        <!-- 댓글 -->
        <div v-for="comment in restaurant.comments" :key="comment.id">
          <div class="border p-1">
            <div>
              <div class="flex justify-between px-2 flex-wrap">
                <div
                  class="cursor-pointer flex-0 w-full md:flex-1 md:w-auto"
                  @click="openAdditionalComment(comment.id)"
                >
                  <div class="flex gap-2">
                    <!-- 아바타 추가 -->
                    <span>
                      {{ comment.message.userInfo.nickName }}
                    </span>

                    <span>
                      {{
                        new Date(comment.message.CreateTime).toLocaleString()
                      }}
                    </span>
                  </div>
                  <div>
                    {{ comment.message.message }}
                  </div>
                </div>
                <!-- 댓글 수정 & 삭제 버튼  -->
                <div
                  v-if="
                    comment.message.userInfo.nickName === userInfo?.username
                  "
                >
                  <button
                    @click="openEditCommnet(comment.id)"
                    class="btn-type-edit p-2"
                  >
                    수정하기
                  </button>
                  <button
                    @click="onDeleteCommnet(comment.id)"
                    class="btn-type-remove p-2"
                  >
                    삭제 하기
                  </button>
                </div>
              </div>

              <!-- 추가 댓글 달기 -->
              <div
                v-show="openAddCommentId === comment.id"
                class="border mx-4 p-2"
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
                  class="mx-2 btn-type-add p-2"
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
                <button class="btn-type-edit p-2" @click="onEditCommnet">
                  수정하기
                </button>
              </div>
              <!-- 추가 댓글 랜더 -->
              <div
                class="border mx-4 p-2"
                v-for="childComment in comment.childMessages"
                :key="childComment.CreateTime + ''"
              >
                <div>
                  <div class="flex gap-2">
                    <!-- 아바타 추가 -->
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
                    class="btn-type-edit p-2"
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
                    class="p-2 btn-type-edit"
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
                    class="p-2 btn-type-remove"
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
        <StarDynamic
          :fill="5"
          :star-num="5"
          :star-size="3"
          @change-star="(star) => (coomentStar = star)"
        />

        <textarea
          ref="textareaRef"
          class="border w-full"
          name=""
          id=""
          @input="textareaAutoHieght"
        ></textarea>
        <button class="btn-type-add p-2" @click="onAddComment">
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
import { deleteFile } from "@/api/file";
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
import StarDynamic from "./Star/star-dynamic.vue";
import StarFill from "./Star/star-fill.vue";

const props = defineProps({
  isSuperUser: Boolean,
});

const { userInfo } = storeToRefs(useUser());
const emits = defineEmits(["close", "delete", "upateComment"]);

const restaurant = ref<Restaurant>();

// 댓글 추가
const coomentStar = ref(5);
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
    star: coomentStar.value,
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
  if (restaurant.value.restaurantImageUrl) {
    await deleteFile(restaurant.value.restaurantImageUrl);
  }

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
.popup-style-view {
  @apply absolute inset-0 bg-black bg-opacity-60 z-[1000];

  .content-wrap {
    @apply m-4 bg-white overflow-auto rounded-2xl overflow-x-hidden;

    max-height: calc(var(--mobile--full) - 2rem);

    .content {
      @apply px-4  clear-both;
    }
  }
}
</style>
