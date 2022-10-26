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

  <SettingRoom
    v-show="roomSetting.isOpenSetting"
    @close="roomSetting.isOpenSetting = false"
    @search-restaurant="roomSetting.isSearchRestaurant = true"
    @approval-wait-list="roomSetting.isApprovalWait = true"
    @join-users="roomSetting.isJoinUsers = true"
    :room="room"
  />

  <!-- 방설정 -->
  <SearchRestaurant
    v-show="roomSetting.isSearchRestaurant"
    @close="roomSetting.isSearchRestaurant = false"
    :restaurant-list="roomSetting.restaurantList"
  />
  <ApprovalWaitList
    v-show="roomSetting.isApprovalWait"
    @close="roomSetting.isApprovalWait = false"
    @update-room="updateRoom"
    :room="room"
  />
  <JoinUsers
    v-show="roomSetting.isJoinUsers"
    @close="roomSetting.isJoinUsers = false"
    @update-users="updateRoom"
    :room="room"
  />

  <div ref="endELRef" class="bg-yellow-600">
    <div v-if="room">
      <p class="text-white text-[2rem] text-center">
        {{ room.roomName }}
      </p>
      <div class="flex justify-between">
        <button class="btn-type-0 m-2" @click="isCreateRoom = true">
          음식점 등록하기
        </button>
        <button
          class="btn-type-0 m-2"
          @click="roomSetting.isOpenSetting = true"
        >
          설정
        </button>
      </div>
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
import { Restaurant, Room, User } from "@/assets/swagger";
import { CustomNaverMaps } from "@/plugin/naverMaps";
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CreateRestaurant from "@/components/CreateRestaurant.vue";
import ViewRestaurant from "../../components/ViewRestaurant.vue";
import { storeToRefs } from "pinia";
import { useUser } from "@/store/user";
import { getRestaurantById } from "@/api/Restaurant";
import { useLoading } from "@/store/loading";
import SettingRoom from "@/components/Room-Setting/Setting-Room.vue";
import SearchRestaurant from "@/components/Room-Setting/SearchRestaurant.vue";
import ApprovalWaitList from "@/components/Room-Setting/ApprovalWaitList.vue";
import JoinUsers from "@/components/Room-Setting/JoinUsers.vue";

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

const roomSetting = reactive({
  isOpenSetting: false,
  isApprovalWait: false,
  isSearchRestaurant: false,
  restaurantList: [] as Restaurant[],
  isJoinUsers: false,
});

interface IRestaurantInfo {
  marker: naver.maps.Marker;
  restaurant: Restaurant;
}
const restaurantList = ref<IRestaurantInfo[]>([]);

watch(restaurantList, () => {
  roomSetting.restaurantList = restaurantList.value.map((v) => v.restaurant);
});

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
  drawRestaurantMarker(restaurant);
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

const drawRestaurantMarker = (restaurant: Restaurant) => {
  const marker = naverMaps.renderMarker(restaurant.lating);
  const restaurantInfo: IRestaurantInfo = {
    marker,
    restaurant,
  };

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

const updateRoom = async () => {
  useLoading().on();
  const { ok, room: _room } = await getRoomInfo({
    uuid: route.params.uuid + "",
  });
  if (ok) {
    room.value = _room;
  }
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
    drawRestaurantMarker(restaurant);
  });
  console.log(restaurantList.value);

  // 지도 높이 조절
  mapFullFunc = () => naverMaps.HeigthFullByEndEl(endELRef.value!);

  setTimeout(() => {
    mapFullFunc();
  }, 1000);

  window.addEventListener("resize", mapFullFunc);
});
onUnmounted(() => {
  window.removeEventListener("resize", mapFullFunc);
});
</script>

<style scoped></style>