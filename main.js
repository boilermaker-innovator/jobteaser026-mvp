// Main application initialization and core functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize handlers
    FormHandler.init();
    PreviewGenerator.init();

    // Tab rotation variables
    let currentTabIndex = 0;
    let rotationInterval;
    let rotationComplete = false;

    // Tab rotation functionality
    function startRotation() {
        if (rotationInterval) {
            clearInterval(rotationInterval);
        }

        rotationInterval = setInterval(() => {
            if (!rotationComplete) {
                const tabs = ['about', 'requirements', 'benefits'];
                currentTabIndex = (currentTabIndex + 1) % tabs.length;
                PreviewGenerator.switchTab(tabs[currentTabIndex]);
            }
        }, 3000); // Rotate every 3 seconds
    }

    // Example data for testing
    function loadExampleData() {
        document.getElementById('jobTitle').value = 'Software Developer';
        document.getElementById('companyName').value = 'Tech Solutions Inc';
        document.getElementById('location').value = 'Remote';
        document.getElementById('logoUrl').value = 'https://via.placeholder.com/80';
        document.getElementById('about').value = 'Join our dynamic team developing cutting-edge software solutions.';
        document.getElementById('requirements').value = '• 3+ years experience in web development\n• Strong JavaScript skills\n• Team player with good communication';
        document.getElementById('benefits').value = '• Competitive salary\n• Remote work\n• Health insurance\n• Professional development';
        document.getElementById('applyUrl').value = 'https://example.com/apply';

        // Update preview with example data
        FormHandler.handlePreview();
    }

    // Button event listeners
    document.getElementById('previewBtn').addEventListener('click', () => {
        FormHandler.handlePreview();
        startRotation(); // Start tab rotation after preview update
    });

    document.getElementById('downloadBtn').addEventListener('click', async () => {
        try {
            await PreviewGenerator.downloadTeaser();
        } catch (error) {
            console.error('Error downloading teaser:', error);
            alert('Failed to download teaser. Please try again.');
        }
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        FormHandler.resetForm();
        if (rotationInterval) {
            clearInterval(rotationInterval);
        }
        rotationComplete = false;
        currentTabIndex = 0;
    });

    // Stop rotation when user interacts with preview
    document.querySelector('.preview').addEventListener('click', () => {
        if (rotationInterval) {
            clearInterval(rotationInterval);
            rotationComplete = true;
        }
    });

    // Handle window resize for responsive layout
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            PreviewGenerator.adjustPreviewSize();
        }, 250);
    });

    // Optional: Load example data on startup
    // loadExampleData();

    // Optional: Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + P for preview
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            FormHandler.handlePreview();
        }
        // Ctrl/Cmd + D for download
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            PreviewGenerator.downloadTeaser();
        }
    });
});
