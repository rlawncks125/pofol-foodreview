<template>
  <div class="popup-style">
    <div class="content-wrap">
      <FaIcon @click="onClose" class="close" icon="ban" size="2x" />
      <div class="content">
        <h2 class="text-[2rem] text-center">참여 중인 유저</h2>
        <div class="flex justify-end">
          <button @click="emits('updateUsers')">새로고침</button>
        </div>
        <div v-if="props.room">
          <div
            v-for="user in props.room.joinUsers"
            :key="user.id"
            class="flex gap-2 my-2 items-center"
          >
            <img
              :src="user.avatar || nullAvatar"
              alt=""
              class="w-[30px] h-[30px] object-cover object-center border rounded-full"
            />
            <p>
              {{ user.username }}
            </p>

            <button
              v-if="
                props.room.superUser.id === userInfo?.id &&
                props.room.superUser.id !== user.id
              "
              @click="kickUsersById(user.id)"
              class="border p-2 hover:bg-gray-200 transition"
            >
              강퇴
            </button>
            <div v-if="props.room.superUser.id === user.id">방장👑</div>
          </div>
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Room, User } from "@/assets/swagger";
import { postKickUser } from "@/api/Room";
import FaIcon from "../fa-icon.vue";
import { useLoading } from "@/store/loading";
import { ref, watch } from "vue";
import { nullAvatar } from "@/common/imageUrl";
import { useUser } from "@/store/user";
import { storeToRefs } from "pinia";

const props = defineProps({
  room: Object as () => Room,
});

const list = ref<User[]>([]);
const { userInfo } = storeToRefs(useUser());

const emits = defineEmits(["close", "updateUsers"]);

const onClose = () => {
  emits("close");
};

const kickUsersById = async (id: number) => {
  console.log(id);
  if (!props.room) return;
  useLoading().on();
  const { ok } = await postKickUser({
    id,
    uuid: props.room.uuid,
  });
  if (ok) {
    emits("updateUsers");
  }
  useLoading().off();
};
</script>

<style scoped lang="scss"></style>
