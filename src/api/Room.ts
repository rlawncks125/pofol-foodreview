import {
  CreateRoomInputDto,
  CreateRoomOutPutDto,
  LeaveRoomInputDto,
  JoinRoomOutPutDto,
  MyRoomsOutPutDto,
  roomInfoDto,
  RoomInfoInputDto,
  RoomInfoOutPutDto,
  RoomOutPutDto,
  JoinRoomInputDto,
  LeaveRoomOutPutDto,
  MyCreateRoomsOutPutDto,
  RoomListInputDto,
  RoomListOutPutDto,
  approvalWaitRoomInfo,
  myApprovalWaitRoomsOutPutDto,
  AcceptUserOutPutDto,
  AcceptUserInPutDto,
  EditRoomInPutDto,
  EdtiRoomOutPutDto,
} from "@/assets/swagger";
// import axios from "axios";
import axios from "@/utils/custoemAxios";
import { AuthHeaders } from "./auth";

/**
 * 방만들기
 *
 */
export const createRoom = async (
  data: CreateRoomInputDto
): Promise<CreateRoomOutPutDto> => {
  return axios.post(`/room`, data, AuthHeaders).then((res: any) => {
    return res.data as CreateRoomOutPutDto;
  });
};

/**
 * 방 리스트 얻기
 */
export const getRoomList = async (
  data: RoomListInputDto
): Promise<RoomListOutPutDto> => {
  return axios.post(`/room/list`, data, AuthHeaders).then((res: any) => {
    return res.data! as RoomListOutPutDto;
  });
};

/**
 * 방정보 얻기
 */
export const getRoomInfo = async ({
  uuid,
}: RoomInfoInputDto): Promise<RoomInfoOutPutDto> => {
  return axios
    .post(`/room/info`, { uuid } as RoomInfoInputDto, AuthHeaders)
    .then((res: any) => {
      return res.data! as RoomInfoOutPutDto;
    });
};

export const getApprovalWaitRooms =
  async (): Promise<myApprovalWaitRoomsOutPutDto> => {
    return axios.get(`/room/myApprovalWait`, AuthHeaders).then((res: any) => {
      return res.data! as myApprovalWaitRoomsOutPutDto;
    });
  };

export const postJoinAccept = async (
  data: AcceptUserInPutDto
): Promise<AcceptUserOutPutDto> => {
  return axios.post(`/room/joinAccept`, data, AuthHeaders).then((res: any) => {
    return res.data! as AcceptUserOutPutDto;
  });
};

export const postJoinReject = async (
  data: AcceptUserInPutDto
): Promise<AcceptUserOutPutDto> => {
  return axios.post(`/room/joinReject`, data, AuthHeaders).then((res: any) => {
    return res.data! as AcceptUserOutPutDto;
  });
};

export const postKickUser = async (
  data: AcceptUserInPutDto
): Promise<AcceptUserOutPutDto> => {
  return axios.post(`/room/kickUser`, data, AuthHeaders).then((res: any) => {
    return res.data! as AcceptUserOutPutDto;
  });
};

export const getMySuperRooms = async (): Promise<MyCreateRoomsOutPutDto> => {
  return axios.get(`/room/mySuperRooms`, AuthHeaders).then((res: any) => {
    return res.data! as MyCreateRoomsOutPutDto;
  });
};

export const getJoinRoomList = async (): Promise<MyRoomsOutPutDto> => {
  return axios.get(`/room`, AuthHeaders).then((res: any) => {
    return res.data as MyRoomsOutPutDto;
  });
};

export const joinRoom = async (
  data: JoinRoomInputDto
): Promise<JoinRoomOutPutDto> => {
  return axios.post(`/room/join`, data, AuthHeaders).then((res: any) => {
    return res.data as JoinRoomOutPutDto;
  });
};

export const editRoom = async (
  data: EditRoomInPutDto
): Promise<EdtiRoomOutPutDto> => {
  return axios.patch(`/room/edit`, data, AuthHeaders).then((res) => {
    return res.data as EdtiRoomOutPutDto;
  });
};

export const leaveRoom = async (
  data: LeaveRoomInputDto
): Promise<LeaveRoomOutPutDto> => {
  return axios.post(`/room/leave`, data, AuthHeaders).then((res: any) => {
    return res.data as LeaveRoomOutPutDto;
  });
};

export const deleteRoom = async (
  uuid: string
): Promise<{ ok: boolean; err?: string }> => {
  return axios.delete(`/room/${uuid}`, AuthHeaders).then((res: any) => {
    return res.data as { ok: boolean; err?: string };
  });
};
