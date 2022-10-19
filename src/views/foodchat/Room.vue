<template>
  <transition name="ani-fade">
    <CreateRestaurant
      v-if="isCreateRoom"
      @close="isCreateRoom = false"
      @create="triggerCreateRestaurant"
      :uuid="room && room.uuid"
      :room-lating="room?.lating"
    />
  </transition>
  <transition name="ani-fade">
    <ViewRestaurant
      ref="viewResturantCompo"
      v-show="isViewRestaurant"
      @close="isViewRestaurant = false"
      @delete="triggerDeleteRestaurant"
      @upate-comment="updateRestaurantById"
      :is-super-user="userInfo?.id === room?.superUser.id"
    />
  </transition>

  <div ref="endELRef" class="bg-yellow-600 h-[5rem]">
    <div v-if="room">
      <p class="text-white text-[2rem] text-center">
        {{ room.roomName }}
      </p>
      <button @click="isCreateRoom = true">음식점 등록하기</button>
    </div>
  </div>
  <div ref="mapRef" class="w-full h-[100vh]"></div>

  <!-- 선택 레스토랑 정보 창 -->
  <div
    v-show="isSelectedRestaurant"
    v-if="selectResturant"
    @click="openViewRestaurant"
    class="absolute bottom-10 w-full flex justify-center dark:text-black"
  >
    <div
      class="bg-slate-100 w-4/6 max-w-3xl h-32 text-center rounded-xl flex flex-col justify-center cursor-pointer shadow-lg shadow-black/40 hover:scale-110"
    >
      {{ selectResturant.restaurantName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRoomInfo } from "@/api/Room";
import { Restaurant, Room } from "@/assets/swagger";
import { CustomNaverMaps } from "@/plugin/naverMaps";
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import CreateRestaurant from "@/components/CreateRestaurant.vue";
import ViewRestaurant from "../../components/ViewRestaurant.vue";
import { storeToRefs } from "pinia";
import { useUser } from "@/store/user";
import { getRestaurantById } from "@/api/Restaurant";
import { useLoading } from "@/store/loading";

const route = useRoute();
const { userInfo } = storeToRefs(useUser());

const endELRef = ref<HTMLElement>();

const mapRef = ref();
let naverMaps: CustomNaverMaps;
let mapFullFunc: any;
const markerInfoWindow = new naver.maps.InfoWindow({ content: "" });

const room = ref<Room>();
const isCreateRoom = ref(false);

const viewResturantCompo = ref<InstanceType<typeof ViewRestaurant>>();
const isViewRestaurant = ref(false);

const isSelectedRestaurant = ref(false);
const selectResturant = ref<Restaurant>();

interface IRestaurantInfo {
  marker: naver.maps.Marker;
  restaurant: Restaurant;
}
let restaurantList = ref<IRestaurantInfo[]>([]);

const restaurantMarkerEvent = ({ marker, restaurant }: IRestaurantInfo) => {
  marker.addListener("click", () => {
    if (markerInfoWindow.getMap()) {
      disableMarkerInfoWindow();
    } else {
      activeMarkerInfoWindow({ marker, restaurant });
    }
  });
};

const activeMarkerInfoWindow = ({
  marker,
  restaurant: _restaurant,
}: IRestaurantInfo) => {
  const findIndex = restaurantList.value.findIndex(
    (fv) => fv.restaurant.id === _restaurant.id
  );
  const restaurant = restaurantList.value[+findIndex].restaurant;

  const infoContent = `
          <p class="font-mono text-xs">레스토랑 id :${restaurant.id}</p>
          <p class="font-mono text-sm">${restaurant.restaurantName}</p>
          <p class="text-xs">${restaurant.resturantSuperUser.nickName} 님이 만들었습니다.</p>
          `;

  markerInfoWindow.setContent(infoContent);
  markerInfoWindow.open(naverMaps.map, marker);

  selectMarkerRestaurant(restaurant);
};

const selectMarkerRestaurant = (restaurant: Restaurant) => {
  selectResturant.value = restaurant;
  isSelectedRestaurant.value = true;
  viewResturantCompo.value?.setInfo(restaurant);
};

const disableMarkerInfoWindow = () => {
  markerInfoWindow.close();
  isSelectedRestaurant.value = false;
};

const openViewRestaurant = () => {
  isViewRestaurant.value = true;
  disableMarkerInfoWindow();
};

const triggerCreateRestaurant = (restaurant: Restaurant) => {
  const marker = naverMaps.renderMarker(restaurant.lating);
  const restaurantInfo: IRestaurantInfo = {
    marker,
    restaurant,
  };
  drawRestaurantMarker(restaurantInfo);
  isCreateRoom.value = false;
};

const triggerDeleteRestaurant = (restaurant: Restaurant) => {
  let deleteItem: IRestaurantInfo;

  restaurantList.value.filter((v) => {
    if (v.restaurant.id === restaurant.id) {
      deleteItem = v;

      return false;
    }

    return true;
  });

  deleteItem!.marker.onRemove();
  isViewRestaurant.value = false;
  disableMarkerInfoWindow();
};

const drawRestaurantMarker = (restaurantInfo: IRestaurantInfo) => {
  restaurantList.value = [...restaurantList.value, restaurantInfo];
  restaurantMarkerEvent(restaurantInfo);
};

const updateRestaurantById = async (id: any) => {
  useLoading().on();
  const { ok, restaurant } = await getRestaurantById(+id);

  restaurantList.value = restaurantList.value.map((v) => {
    if (v.restaurant.id === id) {
      const newItem = {
        marker: v.marker,
        restaurant,
      } as IRestaurantInfo;

      // 업데이트 된 레스토랑이
      // 보고 있는 레스토랑일경우 값 변경
      if (selectResturant.value?.id === id) {
        viewResturantCompo.value?.setInfo(newItem.restaurant);
      }

      return newItem;
    }
    return v;
  });

  useLoading().off();
};

onMounted(async () => {
  const { ok, room: _room } = await getRoomInfo({
    uuid: route.params.uuid + "",
  });

  room.value = _room;
  console.log(_room);

  naverMaps = new CustomNaverMaps(
    mapRef,
    new naver.maps.LatLng(126.6838396, 37.4592758)
  );

  // 중심 마커
  naverMaps.renderMainMarker(room.value.lating);
  naverMaps.mapCenterZoom(room.value.lating, {
    number: 16,
  });

  // 레스토랑 정보 & 마커
  _room.restaurants.map((restaurant) => {
    const marker = naverMaps.renderMarker(restaurant.lating);
    const restaurantInfo: IRestaurantInfo = {
      marker,
      restaurant,
    };

    drawRestaurantMarker(restaurantInfo);
  });
  console.log(restaurantList.value);

  // 지도 높이 조절
  mapFullFunc = () => naverMaps.HeigthFullByEndEl(endELRef.value!);

  mapFullFunc();
  window.addEventListener("resize", mapFullFunc);
});
onUnmounted(() => {
  window.removeEventListener("resize", mapFullFunc);
});
</script>

<style scoped></style>
