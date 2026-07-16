// Marriage Counseling Data Management
const DataManager = {
    STORAGE_KEY: 'marriageCounseling',
    
    getData() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : { modest: {}, francesca: {}, lastUpdated: null };
    },
    
    saveData(data) {
        data.lastUpdated = new Date().toISOString();
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },
    
    savePartner(partner, responses) {
        const data = this.getData();
        data[partner] = responses;
        this.saveData(data);
        return data;
    },
    
    getPartner(partner) {
        const data = this.getData();
        return data[partner] || {};
    },
    
    clearAll() {
        localStorage.removeItem(this.STORAGE_KEY);
    },
    
    isSubmitted(partner) {
        const data = this.getData();
        return data[partner] && data[partner]._submitted;
    }
};

// Form validation and submission
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        // Handle textarea line breaks
        if (typeof value === 'string') {
            value = value.replace(/\n/g, '\n');
        }
        data[key] = value;
    }
    
    data._submitted = true;
    data._submittedAt = new Date().toISOString();
    
    return data;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 5000);
}

function getNotificationStyles() {
    return `
        <style>
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }
            .notification.success {
                background: #2C3E50;
                color: white;
            }
            .notification.error {
                background: #c0392b;
                color: white;
            }
            .notification button {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.8;
            }
            .notification button:hover {
                opacity: 1;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        </style>
    `;
}
