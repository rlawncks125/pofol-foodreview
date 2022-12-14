<template>
  <div class="popup-style">
    <div class="content-wrap">
      <FaIcon @click="onClose" class="close" icon="xmark" size="3x" />
      <div class="content">
        <h2 class="text-[2rem] text-center">방설정</h2>
        <div class="btn-list flex flex-col gap-2">
          <button @click="onSearRestaurant">음식점 찾기</button>
          <!-- <button
            v-if="props.room?.superUser.id === userInfo?.id"
            @click="onChangeRoomSetting"
          >
            방 설정 변경
          </button> -->
          <button
            v-if="props.room?.superUser.id === userInfo?.id"
            @click="onApprovalWaitList"
          >
            대기 유저 목록
          </button>

          <button @click="onJoinUsers">참여중인 유저</button>
          <button @click="onRoomLeave">방 나가기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { leaveRoom } from "@/api/Room";
import { Room } from "@/assets/swagger";
import { useUser } from "@/store/user";
import { useRouter } from "vue-router";
import FaIcon from "../fa-icon.vue";

const props = defineProps({
  room: Object as () => Room,
});

const emits = defineEmits([
  "close",
  "searchRestaurant",
  "approvalWaitList",
  "roomLeave",
  "joinUsers",
  "editRoom",
]);

const router = useRouter();

const { userInfo } = useUser();

const onClose = () => {
  emits("close");
};

const onChangeRoomSetting = () => {
  emits("close");
  emits("editRoom");
};

const onSearRestaurant = () => {
  emits("close");
  emits("searchRestaurant");
};
const onApprovalWaitList = () => {
  emits("close");
  emits("approvalWaitList");
};

const onRoomLeave = async () => {
  if (!props.room) return;

  if (!confirm("정말로 나가실건가요??")) return;

  const { ok } = await leaveRoom({
    uuid: props.room.uuid,
  });

  if (ok) {
    emits("close");
    emits("roomLeave");
    router.push("/chat");
  }
};
const onJoinUsers = () => {
  emits("close");
  emits("joinUsers");
};
</script>

<style scoped lang="scss">
.btn-list {
  button {
    @apply border p-2 hover:bg-gray-200 dark:hover:bg-blue-400;
  }
}
</style>
