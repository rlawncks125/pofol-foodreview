export const mobileHeightSize = () => {
  const dh = window.innerHeight;

  document.documentElement.style.setProperty("--mobile--full", `${dh}px`);
};
