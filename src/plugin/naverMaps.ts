import { App, onMounted, onUnmounted, Ref } from "vue";

export default {
  install: (app: App, options: any) => {
    app.mixin({
      methods: {
        naverMaps: () => {
          return "navermaps";
        },
      },
    });
  },
};

export class CustomNaverMaps {
  mapEl: Ref<HTMLElement>;
  map: naver.maps.Map;
  mainMarker: naver.maps.Marker;

  constructor(mapEl: Ref<HTMLElement>, lating: naver.maps.LatLng) {
    const mapOptions = {
      center: new naver.maps.LatLng(lating.x, lating.y),
      zoom: 14,
      // 지도 줌 컨트롤러
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      zoomControl: true,
      minZoom: 6,
      //
    } as naver.maps.MapOptions;

    this.map = new naver.maps.Map(mapEl.value, mapOptions);
    this.mapEl = mapEl;
  }

  /**
   * 네이버 지도 초기화 (네이버 지도 짤림 버그)
   */
  naverMapsInit = () => {
    // (네이버 지도 짤림 버그)
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  };

  renderMainMarker = (lating: { x: number; y: number }) => {
    this.mainMarker && this.mainMarker.onRemove();

    this.mainMarker = new naver.maps.Marker({
      position: {
        x: lating.x,
        y: lating.y,
      } as naver.maps.LatLng,
      map: this.map,
      icon: {
        url: "https://res.cloudinary.com/dhdq4v4ar/image/upload/v1665577145/kisspng-computer-icons-business-company-building-corporati-5ad84ac07f54b4.9263433115241243525216_mff7j1.jpg",
        // size: new naver.maps.Size(30, 40),
        size: new naver.maps.Size(30, 30),
        // scaledSize: new naver.maps.Size(30, 40),
        scaledSize: new naver.maps.Size(30, 30),
        origin: new naver.maps.Point(0, 0),
        // anchor: new naver.maps.Point(12, 40),
        anchor: new naver.maps.Point(15, 25),
      },
      clickable: false,
    });
  };

  renderMarker = (lating: { x: number; y: number }) => {
    return new naver.maps.Marker({
      position: {
        x: lating.x,
        y: lating.y,
      } as naver.maps.LatLng,
      map: this.map,
    });
  };

  mapCenterZoom = (
    lating: { x: number; y: number },
    zoomOptions: { number: number; effect?: boolean }
  ) => {
    if (!this.map) return;

    this.map.setCenter({
      x: lating.x,
      y: lating.y,
    });
    this.map.setZoom(zoomOptions.number, zoomOptions.effect || false);
  };

  HeigthFullByEndEl = (endELRef: HTMLElement) => {
    window.scrollTo({
      top: 0,
    });

    // const height = window.innerHeight - endELRef.getClientRects()[0].bottom;
    const height = window.innerHeight - endELRef.getClientRects()[0].bottom;

    this.mapEl.value.style.height = `${height}px`;
  };
}
