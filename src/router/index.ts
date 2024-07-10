import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import chatNav from "@/components/Layout_Nav/ChatNavigation.vue";
import mainNav from "@/components/Layout_Nav/navigation.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    meta: { nav: mainNav },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { nav: mainNav },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue"),
  },
  {
    path: "/join",
    name: "join",
    meta: { nav: mainNav },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/join.vue"),
  },
  {
    path: "/test",
    name: "test",
    meta: { nav: mainNav },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/testView.vue"),
  },
  {
    path: "/chat",
    name: "chat",
    meta: { nav: chatNav },
    component: () =>
      import(/* webpackChunkName: "chat" */ "../views/foodchat/index.vue"),
    children: [
      {
        path: "",
        name: "chatMain",
        component: () =>
          import(/* webpackChunkName: "chat" */ "../views/foodchat/main.vue"),
      },
      {
        path: "list",
        name: "roomList",
        component: () =>
          import(
            /* webpackChunkName: "chat" */ "../views/foodchat/RoomList.vue"
          ),
      },
      {
        path: "search",
        name: "roomSearch",
        component: () =>
          import(
            /* webpackChunkName: "chat" */ "../views/foodchat/RoomSearch.vue"
          ),
      },
      {
        path: "mypage",
        name: "roomMypage",
        component: () =>
          import(/* webpackChunkName: "chat" */ "../views/foodchat/Mypage.vue"),
      },
      {
        path: "room/:uuid",
        name: "room",
        component: () =>
          import(/* webpackChunkName: "chat" */ "../views/foodchat/Room.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
