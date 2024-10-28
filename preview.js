const PreviewGenerator = {
    init() {
        this.previewArea = document.getElementById('previewArea');
        this.setupPreviewArea();
    },

    setupPreviewArea() {
        if (!this.previewArea) {
            console.error('Preview area not found');
            return;
        }
        this.clearPreview();
    },

    updatePreview(data) {
        if (!this.previewArea) return;

        const previewHtml = `
            <div class="job-preview">
                <div class="job-header">
                    ${data.logoUrl ? `<img src="${data.logoUrl}" alt="${data.companyName} logo" class="company-logo">` : ''}
                    <div class="job-title-section">
                        <h2>${data.jobTitle}</h2>
                        <h3>${data.companyName}</h3>
                        <p class="location">${data.location}</p>
                    </div>
                </div>
                
                <div class="job-details">
                    <section class="about">
                        <h4>About the Role</h4>
                        <p>${this.formatText(data.about)}</p>
                    </section>
                    
                    <section class="requirements">
                        <h4>Requirements</h4>
                        <p>${this.formatText(data.requirements)}</p>
                    </section>
                    
                    <section class="benefits">
                        <h4>Benefits</h4>
                        <p>${this.formatText(data.benefits)}</p>
                    </section>
                </div>
                
                <div class="apply-section">
                    <a href="${data.applyUrl}" class="apply-button" target="_blank">Apply Now</a>
                </div>
            </div>
        `;

        this.previewArea.innerHTML = previewHtml;
    },

    formatText(text) {
        if (!text) return '';
        // Convert line breaks to HTML and handle bullet points
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*(.*?)\*/g, '<br>• $1');
    },

    async downloadTeaser() {
        try {
            // Create a canvas from the preview
            const preview = document.querySelector('.job-preview');
            if (!preview) return;

            // Use html2canvas or similar library here
            alert('Download feature coming soon!');
            // In real implementation, would generate image and trigger download
        } catch (error) {
            console.error('Error generating teaser:', error);
            alert('Error generating teaser. Please try again.');
        }
    },

    clearPreview() {
        if (this.previewArea) {
            this.previewArea.innerHTML = '<p class="preview-placeholder">Your job teaser preview will appear here...</p>';
        }
    }
};
