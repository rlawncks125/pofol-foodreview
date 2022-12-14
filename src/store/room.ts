import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoomState = defineStore("roomState", () => {
  const room = ref();

  const joinRoom = (uuid: string) => {
    room.value = uuid;
  };

  const leaveRoom = () => {
    room.value = null;
  };

  return {
    room,
    joinRoom,
    leaveRoom,
  };
});
