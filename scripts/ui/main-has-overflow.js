export function checkOverflow() {
  const hasOverflow =
    document.documentElement.scrollHeight > document.documentElement.clientHeight ||
    document.documentElement.scrollWidth > document.documentElement.clientWidth;

  if (hasOverflow) {
    document.querySelector("main").classList.add("scrollbar-border-right");
  } else {
    document.querySelector("main").classList.remove("scrollbar-border-right");
  }
  return hasOverflow;
}
