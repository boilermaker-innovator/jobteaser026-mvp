// Form handling functionality
const FormHandler = {
    formFields: [
        'jobTitle',
        'companyName',
        'location',
        'logoUrl',
        'about',
        'requirements',
        'benefits',
        'applyUrl'
    ],

    init() {
        this.form = document.getElementById('jobForm');
        this.setupEventListeners();
        this.setupAutoSave();
    },

    setupEventListeners() {
        // Preview button
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.handlePreview();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetForm();
        });

        // Download button
        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.handleDownload();
        });
    },

    handlePreview() {
        if (this.validateForm()) {
            const formData = this.getFormData();
            PreviewGenerator.updatePreview(formData);
        }
    },

    handleDownload() {
        if (this.validateForm()) {
            const formData = this.getFormData();
            PreviewGenerator.downloadTeaser(formData);
        }
    },

    validateForm() {
        let isValid = true;
        this.formFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });
        return isValid;
    },

    getFormData() {
        const data = {};
        this.formFields.forEach(fieldId => {
            data[fieldId] = document.getElementById(fieldId).value.trim();
        });
        return data;
    },

    resetForm() {
        this.form.reset();
        PreviewGenerator.clearPreview();
        localStorage.removeItem('jobTeaserData');
    },

    setupAutoSave() {
        // Auto-save form data
        this.formFields.forEach(fieldId => {
            document.getElementById(fieldId).addEventListener('input', () => {
                const formData = this.getFormData();
                localStorage.setItem('jobTeaserData', JSON.stringify(formData));
            });
        });

        // Load saved data if exists
        const savedData = localStorage.getItem('jobTeaserData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            Object.keys(formData).forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    field.value = formData[fieldId];
                }
            });
        }
    }
};
