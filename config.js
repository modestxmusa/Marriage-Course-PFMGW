/**
 * Google Drive Configuration
 * ============================
 * Add this file to your .gitignore - NEVER commit credentials to version control!
 * 
 * HOW TO GET THESE VALUES:
 * ───────────────────────
 * 
 * 1. GOOGLE_CLIENT_ID:
 *    - Go to https://console.cloud.google.com/
 *    - Create or select a project
 *    - APIs & Services → Credentials → Create Credentials → OAuth Client ID
 *    - Application type: "Web application"
 *    - Add your domain to "Authorized JavaScript origins" (e.g., http://localhost, https://yourdomain.com)
 *    - Copy the Client ID (ends with .apps.googleusercontent.com)
 * 
 * 2. GOOGLE_API_KEY:
 *    - Same page: Create Credentials → API Key
 *    - Or go to Credentials and create a new API Key
 *    - Copy the key (looks like: AIzaSy...)
 * 
 * 3. GDRIVE_FOLDER_ID:
 *    - Go to https://drive.google.com
 *    - Create or navigate to your target folder
 *    - The Folder ID is the long string after /folders/ in the URL
 *    - Example: https://drive.google.com/drive/folders/1ABC123xyz... → Folder ID: 1ABC123xyz...
 */

const CONFIG = {
    // ═══════════════════════════════════════════════════════════════
    // REQUIRED: Replace these placeholder values with your own
    // ═══════════════════════════════════════════════════════════════
    
    // Your OAuth Client ID from Google Cloud Console
    GOOGLE_CLIENT_ID: '88174880511-m9jq7tknona72s1828r6rarge4863rtm.apps.googleusercontent.com',
    
    // Your API Key from Google Cloud Console
    GOOGLE_API_KEY: 'AIzaSyAA-2q08YBXVdeHnWvifljAJ3L9mhot1g0',
    
    // Your Google Drive Folder ID (the long ID from the folder URL)
    GDRIVE_FOLDER_ID: '1WL9oAOLX8V6-wY5LD6sCsfl5-cOUzm5k'
};

// Validation helper - check if all credentials are configured
function isConfigured() {
    return CONFIG.GOOGLE_CLIENT_ID && 
           CONFIG.GOOGLE_CLIENT_ID !== '88174880511-m9jq7tknona72s1828r6rarge4863rtm.apps.googleusercontent.com' &&
           CONFIG.GOOGLE_API_KEY && 
           CONFIG.GOOGLE_API_KEY !== 'AIzaSyAA-2q08YBXVdeHnWvifljAJ3L9mhot1g0' &&
           CONFIG.GDRIVE_FOLDER_ID && 
           CONFIG.GDRIVE_FOLDER_ID !== '1WL9oAOLX8V6-wY5LD6sCsfl5-cOUzm5k';
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, isConfigured };
}
