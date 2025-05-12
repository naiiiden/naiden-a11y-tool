function setColorTheme(theme) {
  const html = document.documentElement;

  if (theme === "light" || theme === "dark") {
    html.setAttribute("data-theme", theme);
    localStorage.setItem("naiden-a11y-tool-color-theme", theme);
  } else {
    html.removeAttribute("data-theme");
    localStorage.removeItem("naiden-a11y-tool-color-theme");
  }
}

function initColorTheme() {
  const savedColorTheme = localStorage.getItem("naiden-a11y-tool-color-theme");

  if (savedColorTheme === "light" || savedColorTheme === "dark") {
    setColorTheme(savedColorTheme);
  } else {
    setColorTheme();
  }
}

initColorTheme();

document.getElementById("light")?.addEventListener("click", () => setColorTheme("light"));
document.getElementById("dark")?.addEventListener("click", () => setColorTheme("dark"));
document.getElementById("system")?.addEventListener("click", () => setColorTheme());
