import { useLayout } from "@/store/layout";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/login.vue"),
  },
  {
    path: "/join",
    name: "join",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/join.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/testView.vue"),
  },
  {
    path: "/chat",
    name: "chat",
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
        path: "restaurant/:uuid",
        name: "restaurant",
        component: () =>
          import(
            /* webpackChunkName: "chat" */ "../views/foodchat/Restaurnt.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  useLayout().setNav("home");
});

export default router;
