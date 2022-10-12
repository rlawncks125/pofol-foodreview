import { computed } from "vue";
import { useToken } from "@/store/index";
import { io, Socket } from "socket.io-client";
import { Restaurant, RestaurantInfoDto } from "@/assets/swagger";
import { storeToRefs } from "pinia";

const wsUrl =
  process.env.NODE_ENV === "production"
    ? "wss://pofol-backend.herokuapp.com"
    : "wss://myapi.kimjuchan97.xyz";
const nameSpace = "foodMapChat";

const { token: sToken } = storeToRefs(useToken());
const token = sToken;

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

export const close = () => {
  socket.close();
};

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
  socket.emit("leaveRoom", uuid);
};

export const updateRoom = (uuid: string) => {
  socket.emit("updateRoom", uuid);
};

type FuncUpdateData = (uuid: string) => void;
export const catchUpdateRoom = (catchWs: FuncUpdateData) => {
  socket.off("updateRoom");
  socket.on("updateRoom", (uuid: string) => {
    catchWs(uuid);
  });
};

// 방 마커
export const createMaker = (data: { uuid: string; restaurantId: number }) => {
  socket.emit("createMaker", data);
};

export const catchCreateMaker = (
  catchWs: (restaurant: RestaurantInfoDto) => void
) => {
  socket.off("createMaker");
  socket.on("createMaker", (restaurant: RestaurantInfoDto) => {
    catchWs(restaurant);
  });
};

export const removeMaker = (data: { uuid: string; restaurantId: number }) => {
  socket.emit("removeMaker", data);
};

export const catchRemoveMaker = (catchWs: (restaurantId: number) => void) => {
  socket.off("removeMaker");
  socket.on("removeMaker", (restaurantId: number) => {
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

type FuncUpdateRestaurant = (data: {
  uuid: string;
  restaurant: Restaurant;
}) => void;
export const catchUpdateRestaurant = (catchWs: FuncUpdateRestaurant) => {
  socket.off("updateRestaurant");
  socket.on(
    "updateRestaurant",
    (data: { uuid: string; restaurant: Restaurant }) => {
      catchWs(data);
    }
  );
};

// 댓글 업데이트
export const updateRestaurantComment = (data: {
  uuid: string;
  restaurantId: number;
  commentId: number;
}) => {
  socket.emit("updateRestaurant", data);
};

type FuncUpdateRestaurantComment = (data: {
  uuid: string;
  restaurantId: number;
  comment: Comment;
}) => void;
export const catchUpdateRestaurantComment = (
  catchWs: FuncUpdateRestaurantComment
) => {
  socket.off("updateRestaurantComment");
  socket.on(
    "updateRestaurantComment",
    (data: { uuid: string; restaurantId: number; comment: Comment }) => {
      catchWs(data);
    }
  );
};

export const updateApprovaWait = (userId: number) => {
  socket.emit("ApprovaWait", userId);
};

export const catchApprovaWait = (catchWs: () => void) => {
  socket.off("updateApprovaWait");
  socket.on("updateApprovaWait", () => {
    catchWs();
  });
};

export const updateReqApprovaWait = (uuid: string) => {
  socket.emit("reqApprovaWait", uuid);
};

export const catchReqApprovaWait = (catchWs: () => void) => {
  socket.off("updateReqApprovaWait");
  socket.on("updateReqApprovaWait", () => {
    catchWs();
  });
};

const socketBaseRead = () => {
  socket.on("connect", () => {
    console.log("연결 되었습니다.");
    socket.emit("registration");
  });

  socket.on("disconnect", () => {
    console.log("연결이 끊겼습니다.");
  });
  socket.on("error", (err) => {
    console.log("에러 발생 : ", err);
  });
};
