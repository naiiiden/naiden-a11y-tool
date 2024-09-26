let stylesDisabled = false;
    
document.getElementById('toggleStyles').addEventListener('click', () => {
    stylesDisabled = !stylesDisabled;
    
    // Post message to parent to toggle stylesheets
    window.parent.postMessage({
    type: 'TOGGLE_STYLES',
    disable: stylesDisabled
    }, '*');
    
    document.getElementById('toggleStyles').textContent = stylesDisabled ? 'Enable Styles' : 'Disable Styles';
});