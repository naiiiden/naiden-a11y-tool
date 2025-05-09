const loadingIndicator = document.getElementById("loading-indicator");

export function showLoading() {
  loadingIndicator.style.display = "inline-block";
}

export function hideLoading() {
  loadingIndicator.style.display = "none";
}
