<template>
  <div>방목록</div>
  <button @click="isShowCreateRoom = true">방만들기</button>
  <CreateRoom v-if="isShowCreateRoom" @close="isShowCreateRoom = false" />

  <div v-if="myRoomsInfo">
    <div class="border" v-for="(room, index) in myRoomsInfo" :key="index">
      <p>{{ room.roomName }}</p>
      <p>방장 {{ room.superUser.username }}</p>

      <button @click="enterRoom(room.uuid)">입장</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CreateRoom from "../../components/CreateRoom.vue";
import { getJoinRoomList, getRoomInfo, joinRoom } from "@/api/Room";
import { MyRoomsinfoDto } from "@/assets/swagger";
import { useRouter } from "vue-router";

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
