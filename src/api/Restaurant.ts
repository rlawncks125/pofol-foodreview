import {
  AddMessageByCommentIdInPutDto,
  AddMessageByCommentIdOutPutDto,
  AddRestaurantCommentByIdIdInputDto,
  AddRestaurantCommentByIdIdOutPutDto,
  CreateRestaurantInputDto,
  CreateRestaurantOutPutDto,
  EditCommentChildMessageInPutDto,
  EditCommentChildMessageOutPutDto,
  EditCommentMessageInPutDto,
  EditCommentMessageOutPutDto,
  GetRestaurantByIdOutPutDto,
  RemoveChildMessageInputDto,
  RemoveChildMessageOutPutDto,
} from "@/assets/swagger";
// import axios from "axios";
import axios from "@/utils/custoemAxios";
// import {  } from "./auth";

export const createRestaurant = async (
  data: CreateRestaurantInputDto
): Promise<CreateRestaurantOutPutDto> => {
  return axios
    .post(`/restaurant`, data)
    .then((res: any) => res.data as CreateRestaurantOutPutDto);
};

export const getRestaurantById = async (
  id: number
): Promise<GetRestaurantByIdOutPutDto> => {
  return axios
    .get(`/restaurant/${id}`)
    .then((res: any) => res.data as GetRestaurantByIdOutPutDto);
};

export const deleteRestaurant = async (
  id: number
): Promise<{ ok: boolean; err?: string }> => {
  return axios
    .delete(`/restaurant/${id}`)
    .then((res: any) => res.data as Promise<{ ok: boolean; err?: string }>);
};

export const addRestaurantCommentById = async (
  data: AddRestaurantCommentByIdIdInputDto
): Promise<AddRestaurantCommentByIdIdOutPutDto> => {
  return axios
    .post(`/restaurant/comment`, data)
    .then((res: any) => res.data as AddRestaurantCommentByIdIdOutPutDto);
};

export const editCommentMessage = async (data: EditCommentMessageInPutDto) => {
  return axios
    .patch(`/restaurant/comment`, data)
    .then((res: any) => res.data as EditCommentMessageOutPutDto);
};

export const addMessageByCommentId = async (
  data: AddMessageByCommentIdInPutDto
): Promise<AddMessageByCommentIdOutPutDto> => {
  return axios
    .post(`/restaurant/comment/addMessage`, data)
    .then((res: any) => res.data as AddMessageByCommentIdOutPutDto);
};

export const editCommentChildMessage = async (
  data: EditCommentChildMessageInPutDto
) => {
  return axios
    .patch(`/restaurant/comment/addMessage`, data)
    .then((res: any) => res.data as EditCommentChildMessageOutPutDto);
};

export const deleteCommentChildMessage = async (
  data: RemoveChildMessageInputDto
) => {
  return axios
    .patch(`/restaurant/comment/removeMessage`, data)
    .then((res: any) => res.data as RemoveChildMessageOutPutDto);
};

export const deleteComment = async (id: number) => {
  return axios
    .delete(`/restaurant/comment/${id}`)
    .then((res: any) => res.data as { ok: boolean; err?: string });
};

// '댓글 정보 얻기 ( addMessageById 없어도 될듯? )'
