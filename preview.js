// Preview generation functionality
const PreviewGenerator = {
    init() {
        this.previewArea = document.getElementById('previewArea');
    },

    updatePreview(data) {
        if (!this.previewArea) return;

        this.previewArea.innerHTML = `
            <div class="job-preview">
                <div class="preview-header">
                    ${data.logoUrl ? `
                        <img src="${data.logoUrl}" alt="${data.companyName} logo" class="company-logo">
                    ` : ''}
                    <div class="preview-title">
                        <h3>${data.jobTitle}</h3>
                        <p>${data.companyName} - ${data.location}</p>
                    </div>
                </div>
                
                <div class="preview-content">
                    <section class="preview-section">
                        <h4>About the Role</h4>
                        <p>${this.formatText(data.about)}</p>
                    </section>
                    
                    <section class="preview-section">
                        <h4>Requirements</h4>
                        <p>${this.formatText(data.requirements)}</p>
                    </section>
                    
                    <section class="preview-section">
                        <h4>Benefits</h4>
                        <p>${this.formatText(data.benefits)}</p>
                    </section>
                </div>
                
                <div class="preview-footer">
                    <a href="${data.applyUrl}" class="apply-button" target="_blank">Apply Now</a>
                </div>
            </div>
        `;

        this.addPreviewStyles();
    },

    formatText(text) {
        if (!text) return '';
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
            .replace(/- (.*?)(\n|$)/g, '•&nbsp;$1<br>');
    },

    addPreviewStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .job-preview {
                font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }
            .preview-header {
                display: flex;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            .company-logo {
                width: 80px;
                height: 80px;
                object-fit: contain;
                margin-right: 1rem;
                border-radius: 8px;
            }
            .preview-title h3 {
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
            }
            .preview-section {
                margin-bottom: 1.5rem;
            }
            .preview-section h4 {
                color: #0077B5;
                margin-bottom: 0.5rem;
            }
            .apply-button {
                display: inline-block;
                background: #0077B5;
                color: white;
                padding: 0.75rem 2rem;
                border-radius: 24px;
                text-decoration: none;
                font-weight: 600;
                margin-top: 1rem;
            }
        `;
        document.head.appendChild(style);
    },

    async downloadTeaser() {
        alert('Download feature coming soon!');
        // TODO: Implement download functionality
    },

    clearPreview() {
        if (this.previewArea) {
            this.previewArea.innerHTML = '<p class="preview-placeholder">Your job teaser preview will appear here...</p>';
        }
    }
};
