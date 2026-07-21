// Data Manager - handles localStorage for marriage counseling questionnaire
const DataManager = {
    getData() {
        try {
            const data = localStorage.getItem('marriageCounselingData');
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error('Error reading data:', e);
            return {};
        }
    },
    
    saveData(data) {
        try {
            localStorage.setItem('marriageCounselingData', JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Error saving data:', e);
            return false;
        }
    },
    
    getPartner(partner) {
        const data = this.getData();
        return data[partner] || {};
    },
    
    savePartner(partner, partnerData) {
        const data = this.getData();
        data[partner] = partnerData;
        return this.saveData(data);
    },
    
    isSubmitted(partner) {
        const partnerData = this.getPartner(partner);
        return partnerData._submitted === true;
    }
};

// Collect all form data into an object
function collectFormData(form) {
    const data = {};
    const elements = form.elements;
    
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const name = el.name || el.id;
        
        if (name && name.trim() !== '') {
            if (el.type === 'select-one') {
                data[name] = el.value;
            } else if (el.type === 'radio') {
                if (el.checked) {
                    data[name] = el.value;
                }
            } else if (el.type === 'checkbox') {
                if (!data[name]) data[name] = [];
                if (el.checked) {
                    data[name].push(el.value);
                }
            } else if (el.type !== 'button' && el.type !== 'submit') {
                data[name] = el.value;
            }
        }
    }
    
    return data;
}

// Validate form - check required fields and complete all questions
function validateForm(form) {
    const elements = form.elements;
    let valid = true;
    let firstInvalidField = null;
    
    // Clear previous error states
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        el.classList.remove('error');
    }
    
    // Check all textareas and inputs (not buttons or submit)
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        
        // Skip buttons, submits, and hidden fields
        if (el.type === 'button' || el.type === 'submit' || el.type === 'hidden') {
            continue;
        }
        
        const name = el.name;
        
        // Only check required/specified fields - skip select dropdowns for basic validation
        if ((el.tagName === 'TEXTAREA' || el.type === 'text') && name) {
            // For text fields, only mark as error if partially filled
            if (el.value.trim() !== '' && el.value.trim().length < 10) {
                el.classList.add('error');
                if (!firstInvalidField) firstInvalidField = el;
                valid = false;
            }
        }
    }
    
    if (firstInvalidField) {
        firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    return valid;
}

// Show notification message
function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification-toast');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification-toast notification-' + type;
    notification.innerHTML = '<span>' + message + '</span><button onclick="this.parentElement.remove()" style="background:none;border:none;color:white;font-size:18px;cursor:pointer;margin-left:10px;">&times;</button>';
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#c0392b' : '#f39c12'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
    
    // Add animation style
    if (!document.getElementById('notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Get notification styles for inline injection
function getNotificationStyles() {
    return `
        <style>
            .notification-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }
            .notification-toast.success { background: #27ae60; }
            .notification-toast.error { background: #c0392b; }
            .notification-toast.info { background: #3498db; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .autosave-indicator {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(44, 62, 80, 0.9);
                color: white;
                padding: 10px 15px;
                border-radius: 6px;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.8rem;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 9999;
            }
            .autosave-indicator.visible {
                opacity: 1;
            }
        </style>
    `;
}

// Auto-save functionality with debounce
let autoSaveTimeout = null;

function autoSave(partner, form) {
    // Clear any pending save
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
    
    // Show saving indicator
    showAutoSaveIndicator('saving');
    
    // Debounce - save after 1 second of inactivity
    autoSaveTimeout = setTimeout(() => {
        const data = collectFormData(form);
        
        // Don't mark as submitted during auto-save
        const savedData = { ...data };
        delete savedData._submitted;
        delete savedData._submittedAt;
        
        DataManager.savePartner(partner, savedData);
        showAutoSaveIndicator('saved');
    }, 1000);
}

function showAutoSaveIndicator(status) {
    let indicator = document.querySelector('.autosave-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'autosave-indicator';
        document.body.appendChild(indicator);
    }
    
    if (status === 'saving') {
        indicator.textContent = '⟳ Auto-saving...';
        indicator.classList.add('visible');
    } else if (status === 'saved') {
        indicator.textContent = '✓ Auto-saved';
        indicator.classList.add('visible');
        
        // Hide after 2 seconds
        setTimeout(() => {
            indicator.classList.remove('visible');
        }, 2000);
    }
}

function setupAutoSave(partner, form) {
    const formElements = form.elements;
    
    // Listen for input changes on all form elements
    for (let i = 0; i < formElements.length; i++) {
        const el = formElements[i];
        
        // Skip buttons and submit inputs
        if (el.type === 'button' || el.type === 'submit' || el.type === 'hidden') {
            continue;
        }
        
        // Add event listeners for auto-save
        el.addEventListener('input', () => autoSave(partner, form));
        el.addEventListener('change', () => autoSave(partner, form));
    }
}

// Clear auto-save timeout on page unload
window.addEventListener('beforeunload', () => {
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
});
