<template>
  <div class="popup-style">
    <div class="content-wrap max-w-form md:!mx-auto">
      <FaIcon @click="onClose" class="close" icon="xmark" size="3x" />
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
          class="border block mx-auto my-2 p-2"
        >
          <div>주소 찾기</div>
        </SearchAddress>

        <!-- 이미지 -->
        <FileUpload ref="fileRef" class="mb-[4rem]" />

        <div>
          <label for="create-restaurnt-name" class="font-bold mb-2"
            >레스토랑 이름
          </label>
          <input
            type="text"
            class="block p-2 my-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="input.restaurantName"
            id="create-restaurnt-name"
          />
        </div>
        <div>
          <label for="create-restaurnt-localtion" class="font-bold mb-2"
            >지역</label
          >
          <input
            type="text"
            class="block p-2 my-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            v-model="input.location"
            id="create-restaurnt-localtion"
          />
        </div>
        <!-- 전문 분야 -->
        <div>
          <div class="relative">
            <label for="specialization" class="font-bold mb-2">전문 분야</label>

            <input
              type="specialization"
              id="specialization"
              class="block my-2 p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="전문 분야"
              v-model="input.specialization"
              required
              @keydown="
                (e:KeyboardEvent) => {
                  if (e.key === 'Enter') onAddSpecializtion();
                  return;
                }
              "
            />
            <button
              class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="onAddSpecializtion"
            >
              추가
            </button>
          </div>
          <div class="flex gap-2 flex-wrap">
            <div
              class="flex relative bg-blue-300 border rounded-full py-2 px-2 pr-8"
              v-for="(specialization, index) in input.specializations"
              :key="index"
            >
              <p>
                {{ specialization }}
              </p>
              <button
                class="absolute top-[.5rem] right-[.6rem] text-white"
                @click="onDeleteSpecializtion(index)"
              >
                X
              </button>
            </div>
          </div>
        </div>
        <!-- 해시태그 -->
        <div>
          <div class="relative">
            <label for="hashTags" class="font-bold mb-2">해시태그</label>

            <input
              type="hashTags"
              id="hashTags"
              class="block my-2 p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="#해시태그"
              v-model="input.hashTag"
              required
              @keydown="
                (e:KeyboardEvent) => {
                  if (e.key === 'Enter') onAddHashTag();
                  return;
                }
              "
            />
            <button
              class="text-white absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="onAddHashTag"
            >
              추가
            </button>
          </div>
          <div class="flex gap-2 flex-wrap">
            <div
              class="flex relative bg-blue-300 border rounded-full py-2 px-2 pr-8"
              v-for="(hashTag, index) in input.hashTags"
              :key="index"
            >
              <p>#{{ hashTag }}</p>
              <button
                class="absolute top-[.5rem] right-[.6rem] text-white"
                @click="onDeleteHashTag(index)"
              >
                X
              </button>
            </div>
          </div>
        </div>
        <button class="btn-type-0 my-2" @click="onCreate">만들기</button>
        <br /><br /><br />
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
  location: "",
  restaurantName: "",
  specialization: "",
  specializations: [] as string[],
  hashTag: "",
  hashTags: [] as string[],
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

const onAddHashTag = () => {
  if (input.hashTag === "") return;

  input.hashTags.push(input.hashTag);
  input.hashTag = "";
};

const onDeleteHashTag = (index: number) => {
  input.hashTags = input.hashTags.filter((_, fIndex) => fIndex !== index);
};

const onAddSpecializtion = () => {
  if (input.specialization === "") return;

  input.specializations.push(input.specialization);
  input.specialization = "";
};

const onDeleteSpecializtion = (index: number) => {
  input.specializations = input.specializations.filter(
    (_, fIndex) => fIndex !== index
  );
};

const onClose = () => {
  emits("close", true);
};

const onCreate = async () => {
  console.log("레스토랑 만들기");
  if (input.restaurantName === "") {
    alert("레스토랑 이름을 지정해 주세요");
    return;
  }
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
    hashTags: input.hashTags,
    specialization: input.specializations,
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

  scrollTo({
    top: 0,
  });
});
</script>

<style scoped lang="scss"></style>
