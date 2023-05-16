export const isMobile = () =>
  /iPhone|iPod|BlackBerry|Android|Windows CE|LG|MOT|SAMSUNG|SonyEricsson|webOS|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
