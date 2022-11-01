<template>
  <div class="text-center text-[1.2rem] font-bold">방목록</div>
  <button @click="isShowCreateRoom = true" class="btn-type-0 my-2 mx-2">
    방만들기
  </button>
  <CreateRoom
    v-if="isShowCreateRoom"
    @close="isShowCreateRoom = false"
    @create="onRoomListUpdate"
  />

  <div v-if="myRoomsInfo" class="px-2">
    <div
      class="border my-2 p-2 flex flex-col gap-2"
      v-for="(room, index) in myRoomsInfo"
      :key="index"
    >
      <h1 class="font-bold text-[1.2rem]">{{ room.roomName }}</h1>
      <div class="flex gap-2 items-center">
        <img
          :src="room.superUser.avatar || nullAvatar"
          alt=""
          class="w-[30px] h-[30px] border rounded-full"
        />

        <p>👑{{ room.superUser.username }}</p>
      </div>
      <div>
        <button @click="enterRoom(room.uuid)" class="btn-type-0">입장</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CreateRoom from "../../components/CreateRoom.vue";
import { getJoinRoomList, getRoomInfo, joinRoom } from "@/api/Room";
import { MyRoomsinfoDto } from "@/assets/swagger";
import { useRouter } from "vue-router";
import { nullAvatar } from "@/common/imageUrl";

const router = useRouter();

const isShowCreateRoom = ref(false);

const myRoomsInfo = ref<MyRoomsinfoDto[]>();

/**
 * 방 입장하기
 */
const enterRoom = async (uuid: any) => {
  router.push({
    path: `/chat/room/${uuid}`,
  });
};

const onRoomListUpdate = async () => {
  const { ok, myRooms } = await getJoinRoomList();

  myRoomsInfo.value = myRooms;
};

onMounted(async () => {
  const { ok, myRooms } = await getJoinRoomList();
  // console.log(myRooms);
  myRoomsInfo.value = myRooms;
  // const { ok, users, roomInfo } = await getRoomInfo({
  //   uuid: "08f15e67-3a2f-43da-bdcd-2f5bcf12e7f6",
  // });
  // console.log(users, roomInfo);
});
</script>

<style scoped></style>
