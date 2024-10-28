// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form handlers
    FormHandler.init();
    
    // Initialize preview
    PreviewGenerator.init();

    // Add event listeners for main buttons
    document.getElementById('previewBtn').addEventListener('click', () => {
        FormHandler.updatePreview();
    });

    document.getElementById('downloadBtn').addEventListener('click', () => {
        PreviewGenerator.downloadTeaser();
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        FormHandler.resetForm();
        PreviewGenerator.clearPreview();
    });
});
