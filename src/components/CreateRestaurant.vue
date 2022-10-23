<template>
  <div class="popup-style">
    <div class="content-wrap max-w-form md:!mx-auto">
      <FaIcon @click="onClose" class="close" icon="ban" size="2x" />
      <div class="content">
        <div class="flex items-center">
          <h2 class="flex-1 text-center text-[2rem]">레스토랑</h2>
        </div>
        <!-- <FileUpload ref="compoFile" /> -->
        <!-- 네이버 맵 -->
        <div
          ref="mapRef"
          class="w-full mx-auto z-[101] h-[47vw] max-h-[24rem]"
        ></div>
        <SearchAddress
          @search-address="onMarkerAdress"
          class="border block mx-auto my-2"
        >
          <div>주소 찾기</div>
        </SearchAddress>
        <p>
          {{ props.uuid! }}
        </p>
        <!-- 이미지 -->
        <FileUpload ref="fileRef" class="mb-[4rem]" />
        <p>
          {{ latlng }}
        </p>
        <div>
          <label for="create-restaurnt-name">레스토랑 이름 :</label>
          <input
            type="text"
            class="border"
            v-model="input.restaurantName"
            id="create-restaurnt-name"
          />
        </div>
        <div>
          <label for="create-restaurnt-localtion">지역 :</label>
          <input
            type="text"
            class="border"
            v-model="input.location"
            id="create-restaurnt-localtion"
          />
        </div>
        <!-- 분야 -->
        <!-- 해시태그 -->
        <button class="btn-type-0 my-2" @click="onCreate">만들기</button>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CustomNaverMaps } from "@/plugin/naverMaps";
import { onActivated, onMounted, reactive, ref, watch } from "vue";
import SearchAddress from "./search-address.vue";
import FaIcon from "./fa-icon.vue";
import { createRestaurant } from "@/api/Restaurant";
import { useLoading } from "@/store/loading";
import FileUpload from "./file-upload.vue";

interface ILatlng {
  x: number;
  y: number;
}

const props = defineProps({
  uuid: String,
  roomLating: Object as () => ILatlng,
});

const emits = defineEmits(["close", "create"]);

const fileRef = ref<InstanceType<typeof FileUpload>>();

const mapRef = ref();
let naverMaps: CustomNaverMaps;
// const compoFile = ref<InstanceType<typeof FileUpload>>();

const latlng = ref<ILatlng>();
const input = reactive({
  hashTags: [],
  location: "",
  restaurantName: "",
  specialization: "",
});

let marker: naver.maps.Marker;

const onMarkerAdress = (_address: any) => {
  // roadAddress: _address.roadAddress,

  latlng.value = {
    x: +_address.x,
    y: +_address.y,
  };
  // 마커 그리기  & 기존 마커 제거
  marker?.onRemove();
  marker = naverMaps.renderMarker({
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
  console.log("레스토랑 만들기");
  if (!latlng.value) {
    alert("위치를 지정해주세요.");
    return;
  }

  useLoading().on();

  const imageUrl = await fileRef.value?.onUpload();
  console.log(imageUrl);

  const { ok, restaurant } = await createRestaurant({
    uuid: props.uuid!,
    lating: latlng.value!,
    location: input.location || "",
    // @ts-ignore
    restaurantImageUrl: imageUrl || null,
    restaurantName: input.restaurantName || "",
    hashTags: [],
    specialization: [],
  });

  console.log(restaurant);
  if (ok) {
    emits("create", restaurant);
  }
  useLoading().off();
};

onMounted(() => {
  // 네이버 초기 설정
  naverMaps = new CustomNaverMaps(
    mapRef,
    new naver.maps.LatLng(126.6838396, 37.4592758)
  );

  // 중심 마커 랜더
  naverMaps.renderMainMarker(props.roomLating!);
  naverMaps.mapCenterZoom(props.roomLating!, {
    number: 14,
  });

  naver.maps.Event.addListener(naverMaps.map, "click", (e) => {
    console.log(e.coord);

    // 마커 그리기 & 기존 마커 제거
    marker?.onRemove();
    marker = naverMaps.renderMarker(e.coord);
    latlng.value = {
      x: e.coord.x,
      y: e.coord.y,
    };
  });
  naverMaps.naverMapsInit();
});
</script>

<style scoped lang="scss"></style>
