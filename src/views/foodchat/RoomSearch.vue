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
        <option :value="key" :key="key" v-for="(etype, key) in searchOptions">
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

  <div v-if="showSearchList && showSearchList.length > 0" class="px-4">
    <h2 class="text-[1.5rem] font-bold text-center my-2">검색 결과</h2>
    <div class="border p-2 my-2" v-for="room in showSearchList" :key="room.id">
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
          <p
            v-if="approvalwaitList.includes(room.id)"
            class="font-semibold py-[.55rem] px-4"
          >
            참여 신청 했습니다.
          </p>
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

  <Pagination
    ref="compoPagination"
    :length="searchRoomList?.length"
    :rows-per-page="props.rowPerPage"
    :show-count="props.showCount"
    @trigger-pagination="updatePagintaion"
  />
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
import Pagination from "@/components/Pagination.vue";
import * as Socket from "@/api/Socket";

interface Props {
  rowPerPage?: number;
  showCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  // pagaination 초기값
  rowPerPage: 5,
  showCount: 5,
});

const { userInfo } = storeToRefs(useUser());

const compoPagination = ref<InstanceType<typeof Pagination>>();

const searchRoomList = ref<roomInfoDto[]>();
const showSearchList = ref<roomInfoDto[]>();
const approvalwaitList = ref<number[]>([]);

const searchType = ref<keyof typeof EnumRoomListInputDtoSearchType>(
  EnumRoomListInputDtoSearchType.All
);
const searchOptions = ref({
  [EnumRoomListInputDtoSearchType.All]: "All",
  [EnumRoomListInputDtoSearchType.RoomName]: "방이름",
  [EnumRoomListInputDtoSearchType.SuperUser]: "방장",
});
const findText = ref("");

let _roomList: roomInfoDto[] = [];
let _myRooms: MyRoomsinfoDto[] = [];

const onSearch = async () => {
  useLoading().on();
  await updateRoomList();
  // 현재 페이지 번호 1로 초기화
  compoPagination.value?.initPagintationNumber();

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
  // console.log(userInfo.value?.username);
  searchRoomList.value = _roomList.filter(
    (v) =>
      _myRooms.findIndex((mr) => mr.uuid === v.uuid) === -1 &&
      v.superUserinfo.username !== userInfo.value?.username
  );
  // console.log("참가가능한 방 리스트", searchRoomList.value);
};

const updatePagintaion = ({ min, max }: { min: number; max: number }) => {
  // show search list update
  showSearchList.value = searchRoomList.value?.filter((v, index) => {
    if (min <= index && index < max) {
      return true;
    }
    return false;
  });
};

const updateRoomList = async () => {
  const callRoomList = getRoomList({
    searchType: EnumRoomListInputDtoSearchType[searchType.value],
    value: findText.value,
  });
  const callMyRooms = getJoinRoomList();

  await Promise.all([callRoomList, callMyRooms]).then((v) => {
    const { ok, roomList } = v[0];
    const { ok: ok2, myRooms } = v[1];

    _roomList = roomList;
    _myRooms = myRooms;

    updateSearchRoomList();
    updateApprovalWait();
  });
};

onMounted(async () => {
  updateRoomList();
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
