<template>
  <div class="popup-style">
    <div class="content-wrap">
      <FaIcon @click="onClose" class="close" icon="ban" size="2x" />
      <div class="content">
        <div class="flex items-center">
          <h2 class="flex-1 text-center text-[2rem]">방만들기</h2>
        </div>
        <!-- <FileUpload ref="compoFile" /> -->
        <!-- 네이버 맵 -->
        <div ref="mapRef" class="w-full mx-auto z-[101] h-[47vw]"></div>
        <SearchAddress
          @search-address="onMarkerAdress"
          class="border block mx-auto my-2"
        >
          <div>주소 찾기</div>
        </SearchAddress>
        <p>
          {{ latlng }}
        </p>
        <div>
          <label for="create-room-name">방이름 :</label>
          <input
            type="text"
            class="border"
            v-model="roomName"
            id="create-room-name"
          />
        </div>
        <button @click="onCreate">방만들기</button>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
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

const emits = defineEmits(["close", "create"]);

const mapRef = ref();
let naverMaps: CustomNaverMaps;
// const compoFile = ref<InstanceType<typeof FileUpload>>();

interface ILatlng {
  x: number;
  y: number;
}
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
});
</script>

<style scoped lang="scss">
.popup-style {
  @apply absolute inset-0 bg-gray-400;

  .content-wrap {
    @apply m-4 bg-white px-2 py-4 overflow-auto rounded-2xl;
    max-height: calc(100vh - 2rem);
    .close {
      @apply cursor-pointer float-right mt-[1rem] mr-[1rem] hover:text-red-600;
    }

    .content {
      @apply px-4  clear-both;
    }
  }
}
</style>
