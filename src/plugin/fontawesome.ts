import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faCoffee,
  faHouse,
  faMagnifyingGlass,
  faUsers,
  faXmark,
  faAlignJustify,
  faPlus,
  faGear,
  faBan,
  faAngleUp,
  faAngleDown,
  faArrowRight,
  faArrowLeft,
  faUserPlus,
  faList,
  faSun,
  faMoon,
  faCloudArrowDown,
  faCloudArrowUp,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { App } from "vue";

library.add(
  faCoffee,
  faHouse,
  faMagnifyingGlass,
  faUsers,
  faXmark,
  faAlignJustify,
  faPlus,
  faGear,
  faBan,
  faAngleUp,
  faAngleDown,
  faArrowRight,
  faArrowLeft,
  faUserPlus,
  faList,
  faSun,
  faMoon,
  faCloudArrowDown,
  faCloudArrowUp,
  faStar
);

export default {
  install: (app: App, options: any) => {
    app.component("font-awesome", FontAwesomeIcon);
  },
};

export enum FaIconName {
  "coffee",
  "house",
  "magnifying-glass",
  "users",
  "xmark",
  "align-justify",
  "plus",
  "gear",
  "ban",
  "angleUp",
  "angleDown",
  "arrowRight",
  "arrowLeft",
  "userPlus",
  "list",
  "moon",
  "sun",
  "cloud-arrow-down",
  "cloud-arrow-up",
  "star",
}

export enum FaIconSize {
  "2xs",
  "xs",
  "sm",
  "lg",
  "xl",
  "2xl",
  "1x",
  "2x",
  "3x",
  "4x",
  "5x",
  "6x",
  "7x",
  "8x",
  "9x",
  "10x",
}
