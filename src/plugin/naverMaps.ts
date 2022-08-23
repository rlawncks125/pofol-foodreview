import { App, Ref } from "vue";

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
  }

  renderMainMarker = (lating: { lat: number; lng: number }) => {
    this.mainMarker && this.mainMarker.onRemove();

    this.mainMarker = new naver.maps.Marker({
      position: {
        x: lating.lng,
        y: lating.lat,
      } as naver.maps.LatLng,
      map: this.map,
      icon: {
        url: "https://res.cloudinary.com/dhdq4v4ar/image/upload/v1644527647/back-Portfolio/Company_building_free_icon_4_sd6q06.png",
        size: new naver.maps.Size(30, 40),
        scaledSize: new naver.maps.Size(30, 40),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(12, 40),
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
}
