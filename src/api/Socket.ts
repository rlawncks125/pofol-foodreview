import { computed, ref } from "vue";

import { io, Socket } from "socket.io-client";
import { Restaurant, RestaurantInfoDto, Room } from "@/assets/swagger";
import { useRoomState } from "@/store/room";
import { storeToRefs } from "pinia";

const wsUrl =
  process.env.NODE_ENV === "production"
    ? "https://server.juchandev.store"
    : "http://localhost:8080";
const nameSpace = "foodMapChat";

// const { token: sToken } = storeToRefs(useToken());
// const token = sToken;

const parseToken =
  JSON.parse(localStorage.getItem("token") as string)?.token || null;

export const token = ref<string | null>(parseToken);

let socket: Socket;

export const init = () => {
  socket = io(`${wsUrl}/${nameSpace}`, {
    autoConnect: false,
    transports: ["websocket"],
    auth: {
      "acces-token": token.value,
    },
  });

  connect();
  socketBaseRead();
};

export const connect = () => {
  socket.connect();
};

// export const close = () => {
//   socket.close();
// };

// 방
export const joinRoom = (uuid: string) => {
  socket.emit("joinRoom", uuid);
};

type FuncJoinRoom = (uuid: string) => void;
export const catchJoinRoom = (catchWs: (uuid: string) => void) => {
  socket.off("joinRoom");
  socket.on("joinRoom", (uuid: string) => {
    catchWs(uuid);
  });
};

export const leaveRoom = (uuid: string) => {
  console.log("방을 떠남", uuid);
  socket.emit("leaveRoom", uuid);
};

export const updateRoom = (uuid: string) => {
  socket.emit("updateRoom", uuid);
};

type FuncUpdateData = (room: Room) => void;
export const catchUpdateRoom = (catchWs: FuncUpdateData) => {
  socket.off("updateRoom");
  socket.on("updateRoom", (room: Room) => {
    catchWs(room);
  });
};

// 레스토랑 생성시
export const createRestaurant = (data: {
  uuid: string;
  restaurantId: string;
}) => {
  socket.emit("createRestaurant", data);
};

export const catchCreateRestaurant = (
  catchWs: (restaurant: Restaurant) => void
) => {
  socket.off("createRestaurant");
  socket.on("createRestaurant", (restaurant: Restaurant) => {
    catchWs(restaurant);
  });
};

export const removeRestaurant = (data: {
  uuid: string;
  restaurantId: number;
}) => {
  socket.emit("removeMaker", data);
};

export const catchRemoveRestaurant = (
  catchWs: (restaurantId: number) => void
) => {
  socket.off("removeRestaurant");
  socket.on("removeRestaurant", (restaurantId: number) => {
    catchWs(restaurantId);
  });
};

// 레스토랑
export const updateRestaurant = (data: {
  uuid: string;
  restaurantId: number;
}) => {
  socket.emit("updateRestaurant", data);
};

interface IUpdateRestaruant {
  uuid: string;
  restaurant: Restaurant;
}
type FuncUpdateRestaurant = (data: IUpdateRestaruant) => void;
export const catchUpdateRestaurant = (catchWs: FuncUpdateRestaurant) => {
  socket.off("updateRestaurant");
  socket.on("updateRestaurant", (data: IUpdateRestaruant) => {
    catchWs(data);
  });
};

// 댓글 업데이트
// export const updateRestaurantComment = (data: {
//   uuid: string;
//   restaurantId: number;
//   commentId: number;
// }) => {
//   socket.emit("updateRestaurant", data);
// };

// type FuncUpdateRestaurantComment = (data: {
//   uuid: string;
//   restaurantId: number;
//   comment: Comment;
// }) => void;
// export const catchUpdateRestaurantComment = (
//   catchWs: FuncUpdateRestaurantComment
// ) => {
//   socket.off("updateRestaurantComment");
//   socket.on(
//     "updateRestaurantComment",
//     (data: { uuid: string; restaurantId: number; comment: Comment }) => {
//       catchWs(data);
//     }
//   );
// };

/** 대기 목록 유저 승인 emit */
export const updateApprovaWait = (userId: number) => {
  socket.emit("ApprovaWait", userId);
};

/** 대기 목록 유저 승인 catch */
export const catchApprovaWait = (catchWs: () => void) => {
  socket.off("updateApprovaWait");
  socket.on("updateApprovaWait", () => {
    catchWs();
  });
};

// /** 방참가 신청 emit */
// export const updateReqApprovaWait = (uuid: string) => {
//   socket.emit("reqApprovaWait", uuid);
// };

// /** 유저 신청 들어옴 catch */
// export const catchReqApprovaWait = (catchWs: () => void) => {
//   socket.off("updateReqApprovaWait");
//   socket.on("updateReqApprovaWait", () => {
//     catchWs();
//   });
// };

/** 강제 퇴장 */
export const emitKickUser = (userId: number) => {
  socket.emit("kickUser", userId);
};

/** 강제 퇴장 catch */
export const catchKickUser = (catchWs: () => void) => {
  socket.off("kickUser");
  socket.on("kickUser", () => {
    catchWs();
  });
};

const socketBaseRead = () => {
  socket.on("connect", () => {
    const { room: roomState } = storeToRefs(useRoomState());
    console.log("연결 되었습니다.");
    socket.emit("registration");

    console.log(roomState.value);
    if (roomState.value) {
      console.log("방유지됨", roomState.value);
      joinRoom(roomState.value);
    }
  });

  socket.on("disconnect", (socket: any) => {
    console.log("연결이 끊겼습니다.", socket);
  });
  socket.on("error", (err) => {
    console.log("에러 발생 : ", err);
  });

  /** transport close 에러 문제
   * 이유 : 특정 소켓에 액티비티가 없는 경우 socket.io는
   * 자동으로 소켓을닫음
   * 해결 : 특정 시간마다 데이터(하트비트 연결됬다는 데이터 같음)를
   * 연결받아 타임 아웃 상태를 막음
   */
  // socket.on("ping", (data) => {
  //   socket.emit("pong", { beat: 1 });
  //   console.log(data);
  // });
};

export const isConneted = () => {
  return socket?.connected;
};
