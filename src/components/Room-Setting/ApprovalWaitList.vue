<template>
  <div class="popup-style">
    <div class="content-wrap">
      <FaIcon @click="onClose" class="close" icon="xmark" size="3x" />
      <div class="content">
        <h2 class="text-[2rem] text-center">참여 대기 목록</h2>
        <div class="flex justify-end">
          <button class="btn-type-0" @click="emits('updateRoom')">
            새로고침
          </button>
        </div>
        <div v-if="props.room">
          <div
            v-for="user in props.room.approvalWaitUsers"
            :key="user.id"
            class="flex gap-2 my-2 items-center pb-2 border-b"
          >
            <div class="flex gap-2 items-center">
              <img
                :src="user.avatar || nullAvatar"
                alt=""
                class="w-[30px] h-[30px] border rounded-full object-cover object-center"
              />
              <p>
                {{ user.username }}
              </p>
            </div>
            <div class="flex gap-2">
              <button @click="onAccept(user.id)" class="btn-type-0">
                수락
              </button>
              <button @click="onReject(user.id)" class="btn-type-0">
                거절
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Room } from "@/assets/swagger";
import { postJoinAccept, postJoinReject } from "@/api/Room";
import FaIcon from "../fa-icon.vue";
import { useLoading } from "@/store/loading";
import { nullAvatar } from "@/common/imageUrl";
import * as Socket from "@/api/Socket";

const props = defineProps({
  room: Object as () => Room,
});

const emits = defineEmits(["close", "updateRoom"]);

const onClose = () => {
  emits("close");
};

/** 수락 */
const onAccept = async (id: number) => {
  if (!props.room) return;
  useLoading().on();
  const { ok } = await postJoinAccept({
    id,
    uuid: props.room.uuid,
  });
  if (ok) {
    emits("updateRoom");
    Socket.updateApprovaWait(id);
  }
  useLoading().off();
};

/** 거절 */
const onReject = async (id: number) => {
  if (!props.room) return;
  useLoading().on();
  const { ok } = await postJoinReject({
    id,
    uuid: props.room.uuid,
  });
  if (ok) {
    emits("updateRoom");
  }
  useLoading().off();
};
</script>

<style scoped lang="scss"></style>
