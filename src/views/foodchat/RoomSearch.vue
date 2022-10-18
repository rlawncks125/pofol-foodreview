<template>
  <div>방찾기</div>
  <div class="border">
    <select name="" id="" v-model="searchType">
      <option
        :value="etype"
        :key="index"
        v-for="(etype, index) in EnumRoomListInputDtoSearchType"
      >
        {{ etype }}
      </option>
    </select>
    <div>
      <label for="search-text">포함글자</label>
      <input
        class="border"
        type="text"
        name=""
        id="search-text"
        v-model="findText"
      />
    </div>
    <button @click="onSearch">검색</button>
  </div>

  <div v-if="searRoomList">
    <div class="border" v-for="room in searRoomList" :key="room.id">
      <p>{{ room.roomName }}</p>
      <p>🎇{{ room.superUserinfo.username }}</p>
      <div>
        <p v-if="approvalwaitList.includes(room.id)">참여 신청 했습니다.</p>
        <button v-else @click="onJoinRoom(room.uuid)">참여신청</button>
      </div>
    </div>
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

<style scoped></style>
