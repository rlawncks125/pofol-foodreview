<template>
  <div class="text-center text-[2rem] font-bold">방목록</div>
  <div class="flex justify-between">
    <button @click="isShowCreateRoom = true" class="btn-type-0 my-2 mx-2">
      방만들기
    </button>
    <button
      @click="onRoomListUpdate"
      class="btn-type-0 my-2 mx-2"
      :disabled="isLoadingUpdate"
    >
      {{ isLoadingUpdate ? "로딩중.." : "새로고침" }}
    </button>
  </div>
  <CreateRoom
    v-if="isShowCreateRoom"
    @close="isShowCreateRoom = false"
    @create="onRoomListUpdate"
  />

  <div v-if="myRoomsInfo" class="px-2">
    <div
      class="border my-2 p-2 flex flex-col gap-2"
      v-for="(room, index) in showRoomList"
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

  <!-- 페저네이션 -->

  <Pagination
    ref="compoPagination"
    :length="myRoomsInfo?.length"
    :rows-per-page="props.rowPerPage"
    :show-count="props.showCount"
    @trigger-pagination="updatePagintaion"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CreateRoom from "../../components/CreateRoom.vue";
import { getJoinRoomList, getRoomInfo, joinRoom } from "@/api/Room";
import { MyRoomsinfoDto } from "@/assets/swagger";
import { useRouter } from "vue-router";
import { nullAvatar } from "@/common/imageUrl";
import Pagination from "@/components/Pagination.vue";

interface Props {
  rowPerPage?: number;
  showCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  // pagaination 초기값
  rowPerPage: 5,
  showCount: 3,
});

const router = useRouter();

const isShowCreateRoom = ref(false);
const isLoadingUpdate = ref(false);

const myRoomsInfo = ref<MyRoomsinfoDto[]>();

const compoPagination = ref<InstanceType<typeof Pagination>>();

/**
 * 방 입장하기
 */
const enterRoom = async (uuid: any) => {
  router.push({
    path: `/chat/room/${uuid}`,
  });
};

const onRoomListUpdate = async () => {
  isLoadingUpdate.value = true;
  const { ok, myRooms } = await getJoinRoomList();

  // myRoomsInfo.value = myRooms;
  myRoomsInfo.value = [...myRooms, ...myRooms, ...myRooms];

  // 현재 페이지 번호 1로 초기화
  compoPagination.value?.initPagintationNumber();

  isLoadingUpdate.value = false;
};

//  Pagination
const showRoomList = ref<MyRoomsinfoDto[]>();

const updatePagintaion = ({ min, max }: { min: number; max: number }) => {
  // show Room list update
  showRoomList.value = myRoomsInfo.value?.filter((v, index) => {
    if (min <= index && index < max) {
      return true;
    }
    return false;
  });
};

onMounted(async () => {
  const { ok, myRooms } = await getJoinRoomList();
  // console.log(myRooms);
  // myRoomsInfo.value = myRooms;
  myRoomsInfo.value = [...myRooms, ...myRooms];
});
</script>

<style scoped></style>
