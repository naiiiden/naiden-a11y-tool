const loadingIndicator = document.getElementById("loading-indicator");

export function showLoading() {
    loadingIndicator.style.display = 'flex';
};
  
export function hideLoading() {
    loadingIndicator.style.display = 'none';
};