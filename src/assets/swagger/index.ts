/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class UserService {
  /**
   * 로그인 ( login )
   */
  static userControllerLogin(options: IRequestOptions = {}): Promise<LoginOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 회원가입
   */
  static userControllerUserCreate(options: IRequestOptions = {}): Promise<userCreateOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 정보 변경 ( userUpdate )
   */
  static userControllerUserUpdate(
    params: {
      /** requestBody */
      body?: UserUpdateInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 삭제
   */
  static userControllerUseDelete(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 로그인 토큰 확인
   */
  static userControllerTetUser(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/test';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class RoomService {
  /**
   * 내가 들어간방들 정보 ( myRoomsInfo )
   */
  static roomControllerMyRoomsInfo(options: IRequestOptions = {}): Promise<MyRoomsOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 방 만들기 ( createRoom )
   */
  static roomControllerCreateRoom(
    params: {
      /** requestBody */
      body?: CreateRoomInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CreateRoomOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 참여 신청한 방목록 ( myApprovalWait )
   */
  static roomControllerMyApprovalWait(options: IRequestOptions = {}): Promise<myApprovalWaitRoomsOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/myApprovalWait';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 방 목록 ( roomList )
   */
  static roomControllerRoomList(
    params: {
      /** requestBody */
      body?: RoomListInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RoomListOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/list';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 방 삭제하기 ( removeRoom )
   */
  static roomControllerRemoveRoom(
    params: {
      /** 방고유아이디입니다. */
      uuid: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/{uuid}';
      url = url.replace('{uuid}', params['uuid'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 내가 방장인 방들 조회 ( mySuperRooms )
   */
  static roomControllerMySuperRooms(options: IRequestOptions = {}): Promise<MyCreateRoomsOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/mySuperRooms';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 방 내의 정보들( roomInfo )
   */
  static roomControllerRoomInfo(
    params: {
      /** requestBody */
      body?: RoomInfoInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RoomInfoOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/info';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 방 정보 수정 ( edtiRoom )
   */
  static roomControllerEditRoom(
    params: {
      /** requestBody */
      body?: EditRoomInPutDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<EdtiRoomOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/edit';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 방 참여 요청 보내기 ( joinRoom )
   */
  static roomControllerJoinRoom(
    params: {
      /** requestBody */
      body?: JoinRoomInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<JoinRoomOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/join';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 유저 승인 ( AcceptUser )
   */
  static roomControllerAcceptUser(
    params: {
      /** requestBody */
      body?: AcceptUserInPutDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AcceptUserOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/joinAccept';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 유저 거절 ( rejectUser )
   */
  static roomControllerRejectUser(
    params: {
      /** requestBody */
      body?: AcceptUserInPutDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AcceptUserOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/joinReject';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 유저 강퇴 ( kickUser )
   */
  static roomControllerKickUser(
    params: {
      /** requestBody */
      body?: AcceptUserInPutDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AcceptUserOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/kickUser';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 방나가기 ( leaveRoom )
   */
  static roomControllerLeaveRoom(
    params: {
      /** requestBody */
      body?: LeaveRoomInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<LeaveRoomOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/room/leave';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class RestaurantService {
  /**
   * 레스토랑 정보 조회 ( getRestaurantById )
   */
  static restaurantControllerGetRestaurantById(
    params: {
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetRestaurantByIdOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/restaurant/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 레스토랑 삭제 ( removeRestaurant )
   */
  static restaurantControllerRemoveRestaurant(
    params: {
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/restaurant/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 레스토랑 만들기 ( createRestaurant )
   */
  static restaurantControllerCreateRestaurant(
    params: {
      /** requestBody */
      body?: CreateRestaurantInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CreateRestaurantOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/restaurant';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 레스토랑 댓글 추가 ( addRestaurantCommentById )
   */
  static restaurantControllerAddRestaurantCommentById(
    params: {
      /** requestBody */
      body?: AddRestaurantCommentByIdIdInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AddRestaurantCommentByIdIdOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/restaurant/comment';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 레스토랑 댓글 변경 ( editCommentMessage )
   */
  static restaurantControllerEditCommentMessage(
    params: {
      /** requestBody */
      body?: EditCommentMessageInPutDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<EditCommentMessageOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/restaurant/comment';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 레스토랑 댓글에 추가댓글 추가 ( addMessageByCommentId )
   */
  static restaurantControllerAddMessageByCommentId(
    params: {
      /** requestBody */
      body?: AddMessageByCommentIdInPutDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AddMessageByCommentIdOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/restaurant/comment/addMessage';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 레스토랑 대댓글 변경 ( editCommentChildMessage )
   */
  static restaurantControllerEditCommentChildMessage(
    params: {
      /** requestBody */
      body?: EditCommentChildMessageInPutDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<EditCommentChildMessageOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/restaurant/comment/addMessage';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 레스토랑 댓글에 추가댓글 삭제 ( removeCommentChildMessage )
   */
  static restaurantControllerRemoveCommentChildMessage(
    params: {
      /** requestBody */
      body?: RemoveChildMessageInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RemoveChildMessageOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/restaurant/comment/removeMessage';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 댓글 정보 얻기 ( addMessageById 없어도 될듯? )
   */
  static restaurantControllerAddMessageById(
    params: {
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/restaurant/comment/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 댓글 삭제 ( removeMessageById )
   */
  static restaurantControllerRemoveMessageById(
    params: {
      /** id */
      id: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RemoveMessageByIdOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/restaurant/comment/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class SubwayService {
  /**
   *
   */
  static subwayControllerGetSubway(
    params: {
      /** requestBody */
      body?: GetSubWayScheduleInPutDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/subway';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class ShopUserService {
  /**
   * 회원가입
   */
  static shopUserControllerUserCreate(
    params: {
      /** requestBody */
      body?: CreateShopUserInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CreateShopUserOutPut> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 로그인
   */
  static shopUserControllerUserLogin(options: IRequestOptions = {}): Promise<LoginShopUserOutPut> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 정보 변경 ( userUpdate )
   */
  static shopUserControllerUserUpdate(
    params: {
      /** requestBody */
      body?: UpdateShopUserInput;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UpdateShopUserOutPut> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 유저삭제
   */
  static shopUserControllerUserDlete(options: IRequestOptions = {}): Promise<CoreOutPut> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 내정보 얻기
   */
  static shopUserControllerMyInfo(options: IRequestOptions = {}): Promise<LoginShopUserOutPut> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user/myinfo';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 패스워드 확인
   */
  static shopUserControllerPasswordConfirm(options: IRequestOptions = {}): Promise<CoreOutPut> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user/passwordConfirm';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 패스워드 찾기
   */
  static shopUserControllerFindPassword(
    params: {
      /** requestBody */
      body?: FindPasswordInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CoreOutPut> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user/findPassword';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 회사 정보 추가
   */
  static shopUserControllerAddCompany(
    params: {
      /** requestBody */
      body?: AddCompanyInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AddCompanyOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user/company';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 회사 정보 변경
   */
  static shopUserControllerUpdateCompany(
    params: {
      /** requestBody */
      body?: UpdateCompanyInutDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UpdateCompanyOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user/company';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 회사 정보 삭제
   */
  static shopUserControllerDeleteCompany(options: IRequestOptions = {}): Promise<UpdateCompanyOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user/company';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 장바구니 추가
   */
  static shopUserControllerAddBasketItem(
    params: {
      /** requestBody */
      body?: AddBasketItemInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AddBasketItemOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user/baskItem';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 장바구니 아이템 삭제
   */
  static shopUserControllerRemoveBasketItem(
    params: {
      /** requestBody */
      body?: RemoveBasketItemInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<RemoveBasketItemOutPutdto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-user/baskItem';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class ShopitemService {
  /**
   * 아이템 추가
   */
  static shopItemControllerAddItem(
    params: {
      /** requestBody */
      body?: AddShopItemInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AddShopItemsOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 아이템 검색
   */
  static shopItemControllerSearchItems(
    params: {
      /** title */
      title?: string;
      /** 가져올 객수 */
      take?: number;
      /** ASC - 내림 , DESC - 오름 */
      createTimeOrder?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<SearchItemsOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/search';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { title: params['title'], take: params['take'], createTimeOrder: params['createTimeOrder'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 등록한 아이템들 얻기
   */
  static shopItemControllerGetSellItems(options: IRequestOptions = {}): Promise<SellitemsOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/sell-items';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 여러 아이템 정보 얻기
   */
  static shopItemControllerGetItemsByIds(
    params: {
      /** requestBody */
      body?: GetItemsInfoInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetItemsInfoOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/items';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 장바구니 아이템 얻기
   */
  static shopItemControllerGetBasketItems(options: IRequestOptions = {}): Promise<GetBasketItemsOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/basket-items';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 영수증 발행
   */
  static shopItemControllerCreateIreceipt(
    params: {
      /** requestBody */
      body?: CreateIreceiptInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CreateIreceiptOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/ireceipt';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 주문내역
   */
  static shopItemControllerGetIreceipt(options: IRequestOptions = {}): Promise<GetIreceiptOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/ireceipt';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 판매한 아이템 목록
   */
  static shopItemControllerGetSoldItem(options: IRequestOptions = {}): Promise<GetSoldItemsOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/soldItem';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 판매아이템 정보 변경
   */
  static shopItemControllerPatchSolditem(
    params: {
      /** requestBody */
      body?: PatchSoldItemInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PatchSoldItemOutputDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/soldItem';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 리뷰 달기
   */
  static shopItemControllerAddReview(
    params: {
      /** requestBody */
      body?: AddReviewInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AddReivewOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/soldItem';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 문의 하기
   */
  static shopItemControllerAddQa(
    params: {
      /** requestBody */
      body?: AddQAInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AddQAOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/QA';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 문의 답변
   */
  static shopItemControllerAnswerQa(
    params: {
      /** requestBody */
      body?: AnswerQAInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<AnswerQAOutPutDtop> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/answerQA';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 아이템 변경
   */
  static shopItemControllerUpdateItem(
    params: {
      /** requestBody */
      body?: UpdateItemInputDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UpdateItemOutPut> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/{id}';

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * 아이템 정보 얻기
   */
  static shopItemControllerGetItemById(options: IRequestOptions = {}): Promise<GetItemInfoOutPutDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/{id}';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * 아이템 삭제
   */
  static shopItemControllerDeleteItem(options: IRequestOptions = {}): Promise<CoreOutPut> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/shop-item/{id}';

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export interface User {
  /** id */
  id: number;

  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** password */
  password: string;

  /** 유저 이름입니다. */
  username: string;

  /** 내용물 */
  dsc: string;

  /** 아바타 */
  avatar: string;

  /** 권한 있는 방들 */
  superRooms: string[];
}

export interface LoginOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 토큰 입니다. */
  token?: string;

  /**  */
  user: User;
}

export interface userCreateOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface UserUpdateInputDto {
  /** password */
  password?: string;

  /** 내용물 */
  dsc?: string;

  /** 아바타 */
  avatar?: string;
}

export interface Lating {
  /** Lating_X */
  x: number;

  /** Lating_Y */
  y: number;
}

export interface SuperUserDto {
  /** 유저 아이디 */
  id: number;

  /** 유저 닉네임 */
  nickName: string;
}

export interface MyRoomsRestaurantInfoDto {
  /** id */
  id: number;

  /** 소유자 */
  resturantSuperUser: CombinedResturantSuperUserTypes;

  /** 음식점 이름입니다. */
  restaurantName: string;

  /** 음식점 이미지 url 입니다 */
  restaurantImageUrl: string;

  /** 위치한 지역입니다. */
  location: string;

  /** 좌표입니다. */
  lating: CombinedLatingTypes;
}

export interface MyRoomsJoinUserInfoDto {
  /** id */
  id: number;

  /** 유저 이름입니다. */
  username: string;
}

export interface ApprovalWaitUsersInfoDto {
  /** id */
  id: number;

  /** 유저 이름입니다. */
  username: string;
}

export interface MyRoomsinfoDto {
  /** id */
  id: number;

  /** 방고유아이디입니다. */
  uuid: string;

  /** 방 이름입니다.. */
  roomName: string;

  /** 방 시작 좌표입니다. */
  lating: CombinedLatingTypes;

  /** 방장 입니다. */
  superUser: CombinedSuperUserTypes;

  /** 레스토랑 정보 */
  restaurantInfo: MyRoomsRestaurantInfoDto[];

  /** 방 내의 유저 정보들 */
  joinUsersInfo: MyRoomsJoinUserInfoDto[];

  /** 승인 대기중인 유저들 */
  approvalWaitUsers: ApprovalWaitUsersInfoDto[];
}

export interface MyRoomsOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 방 정보들 */
  myRooms: MyRoomsinfoDto[];
}

export interface approvalWaitRoomInfo {
  /** id */
  id: number;

  /** 방 이름입니다.. */
  roomName: string;
}

export interface myApprovalWaitRoomsOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 룸정보 */
  rooms: approvalWaitRoomInfo[];
}

export interface RoomListInputDto {
  /** 서치 유형 */
  searchType: EnumRoomListInputDtoSearchType;

  /** 값 */
  value?: string;
}

export interface superUserInfoDto {
  /** 유저 이름입니다. */
  username: string;
}

export interface roomInfoDto {
  /** id */
  id: number;

  /** 방고유아이디입니다. */
  uuid: string;

  /** 방 이름입니다.. */
  roomName: string;

  /** 방장 유저 정보 */
  superUserinfo: CombinedSuperUserinfoTypes;
}

export interface RoomListOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 방장 정보들 */
  roomList: roomInfoDto[];
}

export interface CreateRoomInputDto {
  /** 방 이름입니다.. */
  roomName: string;

  /** 방 시작 좌표입니다. */
  lating: CombinedLatingTypes;
}

export interface RoomOutPutDto {
  /** id */
  id: number;

  /** 방고유아이디입니다. */
  uuid: string;

  /** 방 이름입니다.. */
  roomName: string;

  /** 방 시작 좌표입니다. */
  lating: CombinedLatingTypes;

  /** 방장 입니다. */
  superUser: CombinedSuperUserTypes;
}

export interface CreateRoomOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 방정보입니다. */
  room?: CombinedRoomTypes;
}

export interface MyCreateRoomsOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 룸정보 */
  myRooms: MyRoomsinfoDto[];
}

export interface RoomInfoInputDto {
  /** 방고유아이디입니다. */
  uuid: string;
}

export interface UserCommentInfo {
  /** 닉네임 */
  nickName: string;

  /** 유저 or 익명 확인 */
  role: EnumUserCommentInfoRole;

  /** 닉네임 */
  avata: string;
}

export interface messageType {
  /** 댓글 작성 시간 */
  CreateTime: Date;

  /** user정보 */
  userInfo: CombinedUserInfoTypes;

  /** 댓글 내용 */
  message: string;
}

export interface Comment {
  /** id */
  id: number;

  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** 부모 테이블 */
  parentRestaurant: CombinedParentRestaurantTypes;

  /** 별점입니다. */
  star: number;

  /** 메세지 */
  message: CombinedMessageTypes;

  /** 추가 댓글들 */
  childMessages: messageType[];
}

export interface Restaurant {
  /** id */
  id: number;

  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** 소유자 */
  resturantSuperUser: CombinedResturantSuperUserTypes;

  /** 음식점 이름입니다. */
  restaurantName: string;

  /** 음식점 이미지 url 입니다 */
  restaurantImageUrl: string;

  /** 위치한 지역입니다. */
  location: string;

  /** 댓글들 입니다. */
  comments: Comment[];

  /** 평균 별점 */
  avgStar: number;

  /** 좌표입니다. */
  lating: CombinedLatingTypes;

  /** 소속한 방정보입니다. */
  parentRoom: CombinedParentRoomTypes;

  /** 해시태그들 */
  hashTags: string[];

  /** 전문분야 */
  specialization: string[];
}

export interface Room {
  /** id */
  id: number;

  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** 방고유아이디입니다. */
  uuid: string;

  /** 방 이름입니다.. */
  roomName: string;

  /** 방 시작 좌표입니다. */
  lating: CombinedLatingTypes;

  /** 방장 입니다. */
  superUser: CombinedSuperUserTypes;

  /** 참가한 유저들입니다. */
  joinUsers: User[];

  /** 레스토랑 정보들 */
  restaurants: Restaurant[];

  /** 승인대기 유저들 */
  approvalWaitUsers: User[];
}

export interface RoomInfoOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 방 정보 */
  room: CombinedRoomTypes;
}

export interface EditRoomInPutDto {
  /** 방고유아이디입니다. */
  uuid: string;

  /** 방 이름입니다.. */
  roomName?: string;

  /** 방 시작 좌표입니다. */
  lating?: CombinedLatingTypes;

  /** 방장 입니다. */
  superUser?: CombinedSuperUserTypes;
}

export interface EdtiRoomOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface JoinRoomInputDto {
  /** 방고유아이디입니다. */
  uuid: string;
}

export interface JoinRoomOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface AcceptUserInPutDto {
  /** 방고유아이디입니다. */
  uuid: string;

  /** id */
  id: number;
}

export interface AcceptUserOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface LeaveRoomInputDto {
  /** 방고유아이디입니다. */
  uuid: string;
}

export interface LeaveRoomOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface RestaurantInfoDto {
  /** id */
  id: number;

  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** 소유자 */
  resturantSuperUser: CombinedResturantSuperUserTypes;

  /** 음식점 이름입니다. */
  restaurantName: string;

  /** 음식점 이미지 url 입니다 */
  restaurantImageUrl: string;

  /** 위치한 지역입니다. */
  location: string;

  /** 댓글들 입니다. */
  comments: Comment[];

  /** 평균 별점 */
  avgStar: number;

  /** 좌표입니다. */
  lating: CombinedLatingTypes;

  /** 해시태그들 */
  hashTags: string[];

  /** 전문분야 */
  specialization: string[];
}

export interface GetRestaurantByIdOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /**  */
  restaurant: RestaurantInfoDto;
}

export interface CreateRestaurantInputDto {
  /** 방고유아이디입니다. */
  uuid: string;

  /** 음식점 이름입니다. */
  restaurantName: string;

  /** 음식점 이미지 url 입니다 */
  restaurantImageUrl: string;

  /** 위치한 지역입니다. */
  location: string;

  /** 좌표입니다. */
  lating: CombinedLatingTypes;

  /** 해시태그들 */
  hashTags: string[];

  /** 전문분야 */
  specialization: string[];
}

export interface CreateRestaurantOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 만들어진레스토랑 정보입니다. */
  restaurant?: CombinedRestaurantTypes;
}

export interface AddRestaurantCommentByIdIdInputDto {
  /** 레스토랑 아이디 */
  restaurantId: number;

  /** 유저 유형 */
  role: EnumAddRestaurantCommentByIdIdInputDtoRole;

  /** 메세지 */
  message: string;

  /** 별점 */
  star: number;
}

export interface AddRestaurantCommentByIdIdOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface EditCommentMessageInPutDto {
  /** 댓글 id */
  id: number;

  /** 변경할 내용 */
  message: string;
}

export interface EditCommentMessageOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface AddMessageByCommentIdInPutDto {
  /** 코멘트 아이디 */
  commentId: number;

  /** 유저 유형 */
  role: EnumAddMessageByCommentIdInPutDtoRole;

  /** 메세지 */
  message: string;
}

export interface AddMessageByCommentIdOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface RemoveChildMessageInputDto {
  /** 댓글 작성 시간 */
  CreateTime: Date;

  /** id */
  id: number;
}

export interface RemoveChildMessageOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface EditCommentChildMessageInPutDto {
  /** 댓글 아이디 */
  id: number;

  /** 변경할 메세지 생성 시간 */
  createTime: Date;

  /** 변경할 내용 */
  message: string;
}

export interface EditCommentChildMessageOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface RemoveMessageByIdOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface GetSubWayScheduleInPutDto {
  /** 행선 */
  type: EnumGetSubWayScheduleInPutDtoType;

  /** 지하철역 */
  station: string;

  /** 얻을시간 */
  getTime: number;

  /** 인천 1호선 */
  station1?: EnumGetSubWayScheduleInPutDtoStation1;

  /** 인천 2호선 */
  station2?: EnumGetSubWayScheduleInPutDtoStation2;

  /** 서울 1호선 */
  station3?: EnumGetSubWayScheduleInPutDtoStation3;

  /** 7호선 */
  station4?: EnumGetSubWayScheduleInPutDtoStation4;

  /** 수인분당선 */
  station5?: EnumGetSubWayScheduleInPutDtoStation5;
}

export interface CreateShopUserInputDto {
  /** 닉네임 입니다. */
  nickName: string;

  /** 이메일 주소입니다. */
  email: string;

  /** 역할 */
  role: EnumCreateShopUserInputDtoRole;

  /** 도로명 주소 입니다. */
  address: string;

  /** 상세 주소 입니다. */
  addressDetail: string;

  /** 핸드폰 번호입니다. */
  tel: string;

  /** 우편전자 입니다. */
  postcode: string;
}

export interface CreateShopUserOutPut {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface option {
  /** 옵션 이름 */
  name: string;

  /** 옵션 가격 */
  price: number;
}

export interface review {
  /** 리뷰 제목 */
  title: string;

  /** 리뷰 내용 */
  text: string;

  /** 별점 */
  star: number;

  /** 닉네임 */
  nickName: string;

  /** 등록 날짜 */
  addDay: string;

  /** 추가 옵션 */
  selectedOptions: string;
}

export interface QA {
  /** QA 제목 */
  title: string;

  /** QA 내용 */
  text: string;

  /** QA 상태 */
  status: string;

  /** 등록한 닉네임 */
  nickName: string;

  /** 등록한 날짜 */
  addDay: string;

  /** 문제 형태 */
  type: string;

  /** 답변 */
  answer: string;
}

export interface ShopItem {
  /** id */
  id: number;

  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** 판매유저 정보 */
  sellUserInfo: CombinedSellUserInfoTypes;

  /** title */
  title: string;

  /** 가격 */
  price: number;

  /** 할인가 */
  sale: number;

  /** 썸네일 */
  thumbnailSrc: string;

  /** 제품 설명  */
  detailHtml: string;

  /** 옵션  */
  options: option[];

  /** 배송비  */
  parcel: number;

  /** 무료 배송 금액 */
  freeParcel: number;

  /** 원산지 */
  origin: string;

  /** 구매후기 */
  reviews: review[];

  /** 상품 문의 */
  QA: QA[];
}

export interface BaksetItemSelectedOptions {
  /** 옵션 이름 */
  name: string;

  /** 옵션 가격 */
  price: number;

  /** 옵션 선택 개수 */
  count: number;
}

export interface BasketItem {
  /** 아이템 id  */
  itemId: number;

  /** 옵션 구매 갯수  */
  selectedOptions: BaksetItemSelectedOptions[];
}

export interface PayMentInfo {
  /** 결제 방식 */
  pay_method: string;

  /** 카드사 */
  card_name: string;

  /** 카드번호 */
  card_number: string;

  /** 결제 금액 */
  paymentPrice: number;
}

export interface ShopIreceipt {
  /** id */
  id: number;

  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** 구매 유저 */
  purchasedUser: CombinedPurchasedUserTypes;

  /** 판매된 아이템 정보 */
  soldItems: ShopSoldItem[];

  /** 결제 정보 */
  paymentInfo: CombinedPaymentInfoTypes;

  /** 총결제 금액 */
  totalPrice: number;
}

export interface ShopUser {
  /** id */
  id: number;

  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** password */
  password: string;

  /** 유저 아이디 입니다. */
  userId: string;

  /** 닉네임 입니다. */
  nickName: string;

  /** 이메일 주소입니다. */
  email: string;

  /** 역할 */
  role: EnumShopUserRole;

  /** 도로명 주소 입니다. */
  address: string;

  /** 상세 주소 입니다. */
  addressDetail: string;

  /** 핸드폰 번호입니다. */
  tel: string;

  /** 우편전자 입니다. */
  postcode: string;

  /** 장바구니 아이템 정보. */
  basketItems: BasketItem[];

  /** 판매자 정보 */
  sellerInfo: CombinedSellerInfoTypes;

  /** 구매한 아이템 */
  purchased: ShopSoldItem[];

  /** 영수증 */
  ireceipt: ShopIreceipt[];
}

export interface SolidItemInfo {
  /** 아이템 정보  */
  item: CombinedItemTypes;

  /** 옵션 구매 갯수  */
  selectedOptions: BaksetItemSelectedOptions[];
}

export interface ShipInfo {
  /** 도로명 주소 입니다. */
  address: string;

  /** 상세 주소 입니다. */
  addressDetail: string;

  /** 우편전자 입니다. */
  postcode: string;
}

export interface ShopSoldItem {
  /** id */
  id: number;

  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** 판매 유저 */
  sellUserInfo: CombinedSellUserInfoTypes;

  /** 구매 유저 */
  purchasedUser: CombinedPurchasedUserTypes;

  /** 영수증 */
  Ireceipt: CombinedIreceiptTypes;

  /** 구매한 아이템 정보 */
  soldItemsInfo: CombinedSoldItemsInfoTypes;

  /** 결제 가격 */
  payment: number;

  /** 배송 정보 */
  shipInfo: CombinedShipInfoTypes;

  /** 배송 상태 */
  status: EnumShopSoldItemStatus[];

  /** 운송자 번호 */
  transportNumber: string;

  /** 리뷰 달았는지 체크 */
  isReview: boolean;
}

export interface ShopUserSeller {
  /** id */
  id: number;

  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** 대표자 */
  represent: string;

  /** 핸드폰 번호 */
  phone: string;

  /** 이메일 주소 */
  eMail: string;

  /** 회사명 */
  companyName: string;

  /** 회사주소 */
  companyAddress: string;

  /** 판매중인 아이템 */
  sellItems: ShopItem[];

  /** 영수증 */
  soldItem: ShopSoldItem[];
}

export interface UserInfo {
  /** 닉네임 입니다. */
  nickName: string;

  /** 이메일 주소입니다. */
  email: string;

  /** 역할 */
  role: EnumUserInfoRole;

  /** 도로명 주소 입니다. */
  address: string;

  /** 상세 주소 입니다. */
  addressDetail: string;

  /** 핸드폰 번호입니다. */
  tel: string;

  /** 우편전자 입니다. */
  postcode: string;
}

export interface LoginShopUserOutPut {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 판매자 정보 */
  sellerInfo?: CombinedSellerInfoTypes;

  /** 토큰 */
  token: string;

  /** 유저 */
  userInfo: CombinedUserInfoTypes;
}

export interface CoreOutPut {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface FindPasswordInputDto {
  /** 이메일 주소입니다. */
  email: string;
}

export interface UpdateShopUserInput {
  /** password */
  password?: string;

  /** 닉네임 입니다. */
  nickName?: string;

  /** 이메일 주소입니다. */
  email?: string;

  /** 도로명 주소 입니다. */
  address?: string;

  /** 상세 주소 입니다. */
  addressDetail?: string;

  /** 핸드폰 번호입니다. */
  tel?: string;

  /** 우편전자 입니다. */
  postcode?: string;
}

export interface UpdateShopUserOutPut {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface AddCompanyInputDto {
  /** 생성한 날짜 */
  createAt: Date;

  /** 갱신한 날짜 */
  updateAt: Date;

  /** 대표자 */
  represent: string;

  /** 핸드폰 번호 */
  phone: string;

  /** 이메일 주소 */
  eMail: string;

  /** 회사명 */
  companyName: string;

  /** 회사주소 */
  companyAddress: string;

  /** 영수증 */
  soldItem: ShopSoldItem[];
}

export interface AddCompanyOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 판매자정보 */
  sellerInfo: CombinedSellerInfoTypes;
}

export interface UpdateCompanyInutDto {
  /** 대표자 */
  represent?: string;

  /** 핸드폰 번호 */
  phone?: string;

  /** 이메일 주소 */
  eMail?: string;

  /** 회사명 */
  companyName?: string;

  /** 회사주소 */
  companyAddress?: string;
}

export interface UpdateCompanyOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface AddBasketItemInputDto {
  /** 추가할 장바구니 아이템 */
  basketItem: CombinedBasketItemTypes;
}

export interface AddBasketItemOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface RemoveBasketItemInputDto {
  /** 장바구니 아이템 인덱스 */
  itemIndex: number[];
}

export interface RemoveBasketItemOutPutdto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 제거된 아이템 인덱스 */
  removeIndex: number[];
}

export interface SendMailInputDto {}

export interface AddShopItemInputDto {
  /** title */
  title: string;

  /** 가격 */
  price: number;

  /** 할인가 */
  sale: number;

  /** 썸네일 */
  thumbnailSrc: string;

  /** 제품 설명  */
  detailHtml: string;

  /** 옵션  */
  options: option[];

  /** 배송비  */
  parcel: number;

  /** 무료 배송 금액 */
  freeParcel: number;

  /** 원산지 */
  origin: string;
}

export interface AddShopItemsOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 아이템 */
  item: CombinedItemTypes;
}

export interface SearchItemsOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 검색 아이템 */
  items: ShopItem[];
}

export interface SellitemsOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 아이템들 */
  items: ShopItem[];
}

export interface GetItemsInfoInputDto {
  /** 가져올 아이템 id 들 */
  ids: number[];
}

export interface GetItemsInfoOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 아이템들 정보 */
  shopItems: ShopItem[];
}

export interface BasketItemInfo {
  /** 아이템 id  */
  item: CombinedItemTypes;

  /** 옵션 구매 갯수  */
  selectedOptions: BaksetItemSelectedOptions[];
}

export interface GetBasketItemsOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 장바구니 아이템들 정보 */
  items: BasketItemInfo[];
}

export interface soldItemsInfo {
  /** 구매한 아이템 정보 */
  soldItemsInfo: CombinedSoldItemsInfoTypes;

  /** 결제 가격 */
  payment: number;

  /** 배송 정보 */
  shipInfo: CombinedShipInfoTypes;
}

export interface CreateIreceiptInputDto {
  /** 결제 정보 */
  paymentInfo: CombinedPaymentInfoTypes;

  /** 총결제 금액 */
  totalPrice: number;

  /** 구매한 아이템 정보 */
  soldItems: soldItemsInfo[];
}

export interface CreateIreceiptOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface GetIreceiptOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 주문 내역 정보 */
  ireceipts: ShopIreceipt[];
}

export interface GetSoldItemsOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 판매한아이템 */
  items: ShopSoldItem[];
}

export interface PatchSoldItemInputDto {
  /** 변경할 아이템 아이디 */
  itemId: number;

  /** 변경할 배송 상태 */
  status: number;

  /** 운송장 번호 */
  transportNumber?: string;
}

export interface PatchSoldItemOutputDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 갱신된 판매 아이템 */
  soldItem?: CombinedSoldItemTypes;
}

export interface AddReviewInputDto {
  /** 판매 아이템 id */
  soldId: number;

  /** 별점 */
  star: number;

  /** 리뷰 제목 */
  title: string;

  /** 리뷰 내용 */
  text: string;

  /** 추가 옵션 */
  selectedOptions: string;
}

export interface AddReivewOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface AddQAInputDto {
  /** QA 제목 */
  title: string;

  /** QA 내용 */
  text: string;

  /** 문제 형태 */
  type: string;

  /** 아이템 아이디 */
  itemId: number;
}

export interface AddQAOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface AnswerQAInputDto {
  /** 아이템 아이디 */
  itemId: number;

  /** 추가 날짜 */
  addDay: string;

  /** 답변 */
  answer: string;
}

export interface AnswerQAOutPutDtop {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;
}

export interface UpdateItemInputDto {
  /** 판매유저 정보 */
  sellUserInfo?: CombinedSellUserInfoTypes;

  /** title */
  title?: string;

  /** 가격 */
  price?: number;

  /** 할인가 */
  sale?: number;

  /** 썸네일 */
  thumbnailSrc?: string;

  /** 제품 설명  */
  detailHtml?: string;

  /** 옵션  */
  options?: option[];

  /** 배송비  */
  parcel?: number;

  /** 무료 배송 금액 */
  freeParcel?: number;

  /** 원산지 */
  origin?: string;

  /** 구매후기 */
  reviews?: review[];

  /** 상품 문의 */
  QA?: QA[];
}

export interface UpdateItemOutPut {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 아이템 */
  item: CombinedItemTypes;
}

export interface GetItemInfoOutPutDto {
  /** 성공 여부입니다. */
  ok: boolean;

  /** 에러 메세지입니다. */
  err?: string;

  /** 아이템 */
  item: CombinedItemTypes;
}
export type CombinedResturantSuperUserTypes = SuperUserDto;
export type CombinedLatingTypes = Lating;
export type CombinedSuperUserTypes = User;
export enum EnumRoomListInputDtoSearchType {
  'All' = 'All',
  'RoomName' = 'RoomName',
  'SuperUser' = 'SuperUser'
}
export type CombinedSuperUserinfoTypes = superUserInfoDto;
export type CombinedRoomTypes = Room;
export enum EnumUserCommentInfoRole {
  'User' = 'User',
  'Anonymous' = 'Anonymous'
}
export type CombinedUserInfoTypes = UserInfo;
export type CombinedParentRestaurantTypes = Restaurant;
export type CombinedMessageTypes = messageType;
export type CombinedParentRoomTypes = Room;
export type CombinedRestaurantTypes = Restaurant;
export enum EnumAddRestaurantCommentByIdIdInputDtoRole {
  'User' = 'User',
  'Anonymous' = 'Anonymous'
}
export enum EnumAddMessageByCommentIdInPutDtoRole {
  'User' = 'User',
  'Anonymous' = 'Anonymous'
}
export enum EnumGetSubWayScheduleInPutDtoType {
  'incheon1up' = 'incheon1up',
  'incheon1down' = 'incheon1down',
  'incheon2up' = 'incheon2up',
  'incheon2down' = 'incheon2down',
  'seoul1up' = 'seoul1up',
  'seoul1down' = 'seoul1down',
  'station7up' = 'station7up',
  'station7down' = 'station7down',
  'suinup' = 'suinup',
  'suindown' = 'suindown'
}
export enum EnumGetSubWayScheduleInPutDtoStation1 {
  '국제업무지구' = '국제업무지구',
  '센트럴파크' = '센트럴파크',
  '인천대입구' = '인천대입구',
  '지식정보단지' = '지식정보단지',
  '테크노파크' = '테크노파크',
  '캠퍼스타운' = '캠퍼스타운',
  '동막' = '동막',
  '동춘' = '동춘',
  '원인재' = '원인재',
  '신연수' = '신연수',
  '선학' = '선학',
  '문학경기장' = '문학경기장',
  '인천터미널' = '인천터미널',
  '예술회관' = '예술회관',
  '인천시청' = '인천시청',
  '간석오거리' = '간석오거리',
  '부평삼거리' = '부평삼거리',
  '동수' = '동수',
  '부평' = '부평',
  '부평시장' = '부평시장',
  '부평구청' = '부평구청',
  '갈산' = '갈산',
  '작전' = '작전',
  '경인교대' = '경인교대',
  '계산' = '계산',
  '임학' = '임학',
  '박촌' = '박촌',
  '귤현' = '귤현',
  '계양' = '계양'
}
export enum EnumGetSubWayScheduleInPutDtoStation2 {
  '운연' = '운연',
  '인천대공원' = '인천대공원',
  '남동구청' = '남동구청',
  '만수' = '만수',
  '모래내시장' = '모래내시장',
  '석천사거리' = '석천사거리',
  '인천시청' = '인천시청',
  '석바위시장' = '석바위시장',
  '시민공원' = '시민공원',
  '주안' = '주안',
  '주안국가산단' = '주안국가산단',
  '가재울' = '가재울',
  '인천가좌' = '인천가좌',
  '서부여성회관' = '서부여성회관',
  '석남' = '석남',
  '가정중앙시장' = '가정중앙시장',
  '가정' = '가정',
  '서구청' = '서구청',
  '아시아드경기장' = '아시아드경기장',
  '검바위' = '검바위',
  '검암' = '검암',
  '독정' = '독정',
  '완정' = '완정',
  '마전' = '마전',
  '검단사거리' = '검단사거리',
  '왕길' = '왕길',
  '검단오류' = '검단오류'
}
export enum EnumGetSubWayScheduleInPutDtoStation3 {
  '신창' = '신창',
  '온양온천' = '온양온천',
  '배방' = '배방',
  '아산' = '아산',
  '쌍용' = '쌍용',
  '봉명' = '봉명',
  '천안' = '천안',
  '두정' = '두정',
  '직산' = '직산',
  '성환' = '성환',
  '평택' = '평택',
  '평택지제' = '평택지제',
  '서정리' = '서정리',
  '송탄' = '송탄',
  '진위' = '진위',
  '오산' = '오산',
  '오산대' = '오산대',
  '세마' = '세마',
  '서동탄' = '서동탄',
  '병점' = '병점',
  '세류' = '세류',
  '수원' = '수원',
  '화서' = '화서',
  '성균관대' = '성균관대',
  '의왕' = '의왕',
  '당정' = '당정',
  '군포' = '군포',
  '금정' = '금정',
  '명학' = '명학',
  '안양' = '안양',
  '관악' = '관악',
  '석수' = '석수',
  '광명' = '광명',
  '금천구청' = '금천구청',
  '독산' = '독산',
  '가산디지털단지' = '가산디지털단지',
  '인천' = '인천',
  '동인천' = '동인천',
  '도원' = '도원',
  '제물포' = '제물포',
  '도화' = '도화',
  '주안' = '주안',
  '간석' = '간석',
  '동암' = '동암',
  '백운' = '백운',
  '부평' = '부평',
  '부개' = '부개',
  '송내' = '송내',
  '중동' = '중동',
  '부천' = '부천',
  '소사' = '소사',
  '역곡' = '역곡',
  '온수' = '온수',
  '오류동' = '오류동',
  '개봉' = '개봉',
  '구일' = '구일',
  '구로' = '구로',
  '신도림' = '신도림',
  '영등포' = '영등포',
  '신길' = '신길',
  '대방' = '대방',
  '노량진' = '노량진',
  '용산' = '용산',
  '남영' = '남영',
  '서울역' = '서울역',
  '시청' = '시청',
  '종각' = '종각',
  '종로3가' = '종로3가',
  '종로5가' = '종로5가',
  '동대문' = '동대문',
  '동묘앞' = '동묘앞',
  '신설동' = '신설동',
  '제기동' = '제기동',
  '청량리' = '청량리',
  '회기' = '회기',
  '외대앞' = '외대앞',
  '신이문' = '신이문',
  '석계' = '석계',
  '광운대' = '광운대',
  '월계' = '월계',
  '녹천' = '녹천',
  '창동' = '창동',
  '방학' = '방학',
  '도봉' = '도봉',
  '도봉산' = '도봉산',
  '망월사' = '망월사',
  '회룡' = '회룡',
  '의정부' = '의정부',
  '가능' = '가능',
  '녹양' = '녹양',
  '양주' = '양주',
  '마전' = '마전',
  '덕계' = '덕계',
  '덕정' = '덕정',
  '지행' = '지행',
  '동두천중앙' = '동두천중앙',
  '보산' = '보산',
  '동두천' = '동두천',
  '소요산' = '소요산'
}
export enum EnumGetSubWayScheduleInPutDtoStation4 {
  '석남' = '석남',
  '산곡' = '산곡',
  '부평구청' = '부평구청',
  '굴포천' = '굴포천',
  '삼산체육관' = '삼산체육관',
  '상동' = '상동',
  '부천시청' = '부천시청',
  '신중동' = '신중동',
  '춘의' = '춘의',
  '부천종합운동장' = '부천종합운동장',
  '까치울' = '까치울',
  '온수' = '온수',
  '천왕' = '천왕',
  '광명사거리' = '광명사거리',
  '철산' = '철산',
  '가산디지털단지' = '가산디지털단지',
  '남구로' = '남구로',
  '대림' = '대림',
  '신풍' = '신풍',
  '보라매' = '보라매',
  '신대방삼거리' = '신대방삼거리',
  '장승배기' = '장승배기',
  '상도' = '상도',
  '숭실대입구' = '숭실대입구',
  '남성' = '남성',
  '이수' = '이수',
  '내방' = '내방',
  '고속터미널' = '고속터미널',
  '반포' = '반포',
  '논현' = '논현',
  '학동' = '학동',
  '강남구청' = '강남구청',
  '청담' = '청담',
  '뚝섬유원지' = '뚝섬유원지',
  '건대입구' = '건대입구',
  '어린이대공원' = '어린이대공원',
  '군자' = '군자',
  '중곡' = '중곡',
  '용마산' = '용마산',
  '사가정' = '사가정',
  '면목' = '면목',
  '상봉' = '상봉',
  '중화' = '중화',
  '먹골' = '먹골',
  '태릉입구' = '태릉입구',
  '공릉' = '공릉',
  '하계' = '하계',
  '중계' = '중계',
  '노원' = '노원',
  '마들' = '마들',
  '수락산' = '수락산',
  '도봉산' = '도봉산',
  '장암' = '장암'
}
export enum EnumGetSubWayScheduleInPutDtoStation5 {
  '인천' = '인천',
  '신포' = '신포',
  '숭의' = '숭의',
  '인하대' = '인하대',
  '송도' = '송도',
  '연수' = '연수',
  '원인재' = '원인재',
  '남동인더스파크' = '남동인더스파크',
  '호구포' = '호구포',
  '인천논현' = '인천논현',
  '소래포구' = '소래포구',
  '월곶' = '월곶',
  '달월' = '달월',
  '오이도' = '오이도',
  '정왕' = '정왕',
  '신길온천' = '신길온천',
  '안산' = '안산',
  '초지' = '초지',
  '고잔' = '고잔',
  '중앙' = '중앙',
  '한대앞' = '한대앞',
  '사리' = '사리',
  '야목' = '야목',
  '어천' = '어천',
  '오목천' = '오목천',
  '고색' = '고색',
  '수원' = '수원',
  '매교' = '매교',
  '수원시청' = '수원시청',
  '매탄권선' = '매탄권선',
  '망포' = '망포',
  '영통' = '영통',
  '청명' = '청명',
  '상갈' = '상갈',
  '기흥' = '기흥',
  '신갈' = '신갈',
  '구성' = '구성',
  '보정' = '보정',
  '죽전' = '죽전',
  '오리' = '오리',
  '미금' = '미금',
  '정자' = '정자',
  '수내' = '수내',
  '서현' = '서현',
  '이매' = '이매',
  '야탑' = '야탑',
  '모란' = '모란',
  '태평' = '태평',
  '가천대' = '가천대',
  '복정' = '복정',
  '수서' = '수서',
  '대모산입구' = '대모산입구',
  '개포동' = '개포동',
  '구룡' = '구룡',
  '도곡' = '도곡',
  '한티' = '한티',
  '선릉' = '선릉',
  '선정릉' = '선정릉',
  '강남구청' = '강남구청',
  '압구정로데오' = '압구정로데오',
  '서울숲' = '서울숲',
  '왕십리' = '왕십리',
  '청량리' = '청량리'
}
export enum EnumCreateShopUserInputDtoRole {
  'company' = 'company',
  'customer' = 'customer'
}
export type CombinedSellUserInfoTypes = ShopUserSeller;
export type CombinedPurchasedUserTypes = ShopUser;
export type CombinedPaymentInfoTypes = PayMentInfo;
export enum EnumShopUserRole {
  'company' = 'company',
  'customer' = 'customer'
}
export type CombinedSellerInfoTypes = ShopUserSeller;
export type CombinedItemTypes = ShopItem;
export type CombinedIreceiptTypes = ShopIreceipt;
export type CombinedSoldItemsInfoTypes = SolidItemInfo;
export type CombinedShipInfoTypes = ShipInfo;
export enum EnumShopSoldItemStatus {
  '결제완료' = '결제완료',
  '배송 정보 접수' = '배송 정보 접수',
  '화물접수' = '화물접수',
  '운송 업체 시설 도착' = '운송 업체 시설 도착',
  '배송중' = '배송중',
  '배송직전' = '배송직전',
  '배송완료' = '배송완료'
}
export enum EnumUserInfoRole {
  'company' = 'company',
  'customer' = 'customer'
}
export type CombinedBasketItemTypes = BasketItem;
export type CombinedSoldItemTypes = ShopSoldItem;
