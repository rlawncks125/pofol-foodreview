<template>
  <h1 class="text-[2rem] font-bold text-center mb-4">방찾기</h1>
  <div class="p-2">
    <!--  서치바-->
    <div class="flex">
      <select
        class="select-arrow text-left flex-shrink-0 z-10 cursor-pointer inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 focus:outline-none"
        name=""
        id="search-type"
        v-model="searchType"
      >
        <option
          :value="etype"
          :key="index"
          v-for="(etype, index) in EnumRoomListInputDtoSearchType"
        >
          {{ etype }}
        </option>
      </select>
      <div class="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 focus:outline-none"
          placeholder="Search"
          required
          v-model="findText"
          @keydown="
            (e) => {
              if (e.key === 'Enter') onSearch();

              return;
            }
          "
        />
        <button
          type="submit"
          class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border-2 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="onSearch"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <div v-if="searRoomList && searRoomList.length > 0" class="px-4">
    <h2 class="text-[1.5rem] font-bold text-center my-2">검색 결과</h2>
    <div class="border p-2 my-2" v-for="room in searRoomList" :key="room.id">
      <p class="font-bold text-[1.2rem] text-center">{{ room.roomName }}</p>
      <div class="flex justify-between px-4">
        <div class="flex gap-2 items-center">
          <img
            :src="room.superUserinfo.avatar || nullAvatar"
            alt=""
            class="w-[30px] h-[30px] border rounded-full"
          />
          <p class="font-bold">👑{{ room.superUserinfo.username }}</p>
        </div>
        <div class="flex items-center">
          <p v-if="approvalwaitList.includes(room.id)">참여 신청 했습니다.</p>
          <button class="btn-type-0" v-else @click="onJoinRoom(room.uuid)">
            참여신청
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>검색 결과가 없습니다.</p>
  </div>
</template>

<script setup lang="ts">
import {
  getApprovalWaitRooms,
  getJoinRoomList,
  getRoomList,
  joinRoom,
} from "@/api/Room";
import {
  EnumRoomListInputDtoSearchType,
  MyRoomsinfoDto,
  MyRoomsOutPutDto,
  roomInfoDto,
} from "@/assets/swagger";
import { useLoading } from "@/store/loading";
import { useUser } from "@/store/user";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { nullAvatar } from "@/common/imageUrl";

interface Props {
  pagination?: number;
}

const props = withDefaults(defineProps<Props>(), {
  pagination: 5,
});

const { userInfo } = storeToRefs(useUser());

const searRoomList = ref<roomInfoDto[]>();
const approvalwaitList = ref<number[]>([]);

const searchType = ref<keyof typeof EnumRoomListInputDtoSearchType>("All");
const findText = ref("");

let _roomList: roomInfoDto[] = [];
let _myRooms: MyRoomsinfoDto[] = [];

const onSearch = async () => {
  useLoading().on();
  const { ok, roomList } = await getRoomList({
    searchType: EnumRoomListInputDtoSearchType[searchType.value],
    value: findText.value,
  });
  if (ok) {
    _roomList = roomList;
    console.log(roomList);
    updateSearchRoomList();
  }

  useLoading().off();
};

const onJoinRoom = async (uuid: any) => {
  const { ok } = await joinRoom({
    uuid,
  });

  if (ok) {
    updateApprovalWait();
  }
};

/**
 * 참여 신청중인 방 목록 생신
 */
const updateApprovalWait = async () => {
  const { ok, rooms } = await getApprovalWaitRooms();

  approvalwaitList.value = rooms.map((v) => v.id);
};

/**
 * 찾는 방 목록 갱신
 */
const updateSearchRoomList = () => {
  console.log(userInfo.value?.username);
  searRoomList.value = _roomList.filter(
    (v) =>
      _myRooms.findIndex((mr) => mr.uuid === v.uuid) === -1 &&
      v.superUserinfo.username !== userInfo.value?.username
  );
};

onMounted(async () => {
  const callRoomList = getRoomList({
    searchType: EnumRoomListInputDtoSearchType[searchType.value],
    value: "",
  });
  const callMyRooms = getJoinRoomList();

  Promise.all([callRoomList, callMyRooms]).then((v) => {
    const { ok, roomList } = v[0];
    const { ok: ok2, myRooms } = v[1];

    _roomList = roomList;
    _myRooms = myRooms;

    updateSearchRoomList();
    updateApprovalWait();
  });
});
</script>

<style scoped lang="scss">
.select-arrow {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1rem;
  @apply pr-[2rem];
}
</style>
