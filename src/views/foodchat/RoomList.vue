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
  <div class="pagination-wrap">
    <span class="pagination-start" @click="chnagePagination(1)">처음</span>

    <!-- <span class="pagination">1</span>
    <span class="pagination-active">2</span>
    <span class="pagination">3</span> -->
    <span
      v-for="(page, index) in Array.from(
        { length: roopRepeat },
        (v, index) => index + startPagination
      )"
      :class="nowPagination === page ? 'pagination-active' : 'pagination'"
      :key="index"
      @click="chnagePagination(+page)"
    >
      {{ page }}
    </span>
    <span class="pagination-end" @click="chnagePagination(totalPagination)"
      >끝</span
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CreateRoom from "../../components/CreateRoom.vue";
import { getJoinRoomList, getRoomInfo, joinRoom } from "@/api/Room";
import { MyRoomsinfoDto } from "@/assets/swagger";
import { useRouter } from "vue-router";
import { nullAvatar } from "@/common/imageUrl";

interface Props {
  pagination?: number;
}

const props = withDefaults(defineProps<Props>(), {
  pagination: 5,
});

const router = useRouter();

const isShowCreateRoom = ref(false);
const isLoadingUpdate = ref(false);

const myRoomsInfo = ref<MyRoomsinfoDto[]>();

// 페저네이션
const showRoomList = ref<MyRoomsinfoDto[]>();
const totalPagination = ref<number>(0);
const repeatPagination = 4;
const roopRepeat = ref<number>(0);
const nowPagination = ref<number>(1);
const startPagination = ref<number>(1);

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

  myRoomsInfo.value = myRooms;

  nowPagination.value = 1;
  updateShowRoomList();

  isLoadingUpdate.value = false;
};

const chnagePagination = (v: number) => {
  nowPagination.value = v;

  updateShowRoomList();
};

const updateShowRoomList = () => {
  totalPagination.value = Math.ceil(
    (myRoomsInfo.value?.length || 0) / props.pagination
  );

  roopRepeat.value = Math.min(totalPagination.value, repeatPagination);

  const end = totalPagination.value - (roopRepeat.value - 1);

  const start = Math.max(nowPagination.value - 1, 1);

  end > start ? (startPagination.value = start) : (startPagination.value = end);

  const min = props.pagination * (nowPagination.value - 1);
  const max = min + props.pagination;

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
  myRoomsInfo.value = [...myRooms, ...myRooms, ...myRooms];
  // const { ok, users, roomInfo } = await getRoomInfo({
  //   uuid: "08f15e67-3a2f-43da-bdcd-2f5bcf12e7f6",
  // });
  // console.log(users, roomInfo);

  updateShowRoomList();
});
</script>

<style scoped lang="scss">
.pagination-wrap {
  @apply flex -space-x-px mx-auto justify-center px-2;
}

.pagination-start {
  @apply cursor-pointer py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}
.pagination-end {
  @apply cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}

.pagination {
  @apply cursor-pointer py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}

.pagination-active {
  @apply pointer-events-none py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white;
}
</style>
