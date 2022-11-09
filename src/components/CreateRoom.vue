<template>
  <div class="popup-style">
    <div class="content-wrap">
      <FaIcon @click="onClose" class="close" icon="xmark" size="3x" />
      <div class="content">
        <div class="flex items-center">
          <h2 class="flex-1 text-center text-[2rem]">방만들기</h2>
        </div>
        <!-- <FileUpload ref="compoFile" /> -->
        <!-- 네이버 맵 -->
        <div
          ref="mapRef"
          class="w-full mx-auto z-[101] h-[47vw] max-w-container max-h-[30rem]"
        ></div>
        <SearchAddress
          @search-address="onMarkerAdress"
          class="border block mx-auto my-2 p-2"
        >
          <div>주소 찾기</div>
        </SearchAddress>
        <!-- <p>
          {{ latlng }}
        </p> -->
        <div>
          <label for="create-room-name" class="font-bold mb-2">방이름</label>
          <input
            type="text"
            class="lock p-2 my-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="roomName"
            id="create-room-name"
          />
        </div>
        <button @click="onCreate" class="btn-type-0 my-2">방만들기</button>
        <br /><br /><br />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileUpload from "@/components/file-upload.vue";
import { CustomNaverMaps } from "@/plugin/naverMaps";
import { onMounted, ref } from "vue";
import SearchAddress from "@/components/search-address.vue";
import { createRoom } from "@/api/Room";
import FaIcon from "./fa-icon.vue";
import { useLoading } from "@/store/loading";

interface ILatlng {
  x: number;
  y: number;
}

const emits = defineEmits(["close", "create"]);

const mapRef = ref();
let naverMaps: CustomNaverMaps;
// const compoFile = ref<InstanceType<typeof FileUpload>>();

const latlng = ref<ILatlng>();
const roomName = ref();

const onMarkerAdress = (_address: any) => {
  // roadAddress: _address.roadAddress,

  latlng.value = {
    x: +_address.x,
    y: +_address.y,
  };
  naverMaps.renderMainMarker({
    x: latlng.value.x,
    y: latlng.value.y,
  });

  naverMaps.mapCenterZoom(
    {
      x: latlng.value.x,
      y: latlng.value.y,
    },
    {
      number: 17,
      effect: true,
    }
  );

  console.log(latlng);
};

const onClose = () => {
  emits("close", true);
};

const onCreate = async () => {
  if (!latlng.value) {
    alert("중심이될 주소를 정하세요");
    return;
  }
  if (!roomName.value) {
    alert("방이름을 입력하세요.");
    return;
  }

  const { ok, room } = await createRoom({
    lating: latlng.value,
    roomName: roomName.value,
  });

  if (ok) {
    console.log(room);
    emits("create", room);
    onClose();
  }
};

onMounted(() => {
  naverMaps = new CustomNaverMaps(
    mapRef,
    new naver.maps.LatLng(126.6838396, 37.4592758)
  );

  naver.maps.Event.addListener(naverMaps.map, "click", (e) => {
    console.log(e.coord);
    naverMaps.renderMainMarker(e.coord);
    latlng.value = {
      x: e.coord.x,
      y: e.coord.y,
    };
  });

  naverMaps.naverMapsInit();

  scrollTo({
    top: 0,
  });
});
</script>

<style scoped lang="scss"></style>
