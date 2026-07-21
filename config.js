/**
 * Google Drive Configuration
 * 
 * IMPORTANT: Do NOT commit this file to version control (GitHub, etc.)
 * Add config.js to your .gitignore file
 * 
 * HOW TO GET THESE VALUES:
 * 
 * 1. GOOGLE_CLIENT_ID:
 *    - Go to https://console.cloud.google.com/
 *    - Create or select a project
 *    - APIs & Services → Credentials → Create Credentials → OAuth Client ID
 *    - Application type: "Web application"
 *    - Add your deployed domain to "Authorized JavaScript origins"
 *    - Copy the Client ID (looks like: xxx.apps.googleusercontent.com)
 * 
 * 2. GOOGLE_API_KEY:
 *    - Same page: Create Credentials → API Key
 *    - Copy the key (looks like: AIzaSy...)
 *    - Optionally restrict the key to the Drive API only
 * 
 * 3. GDRIVE_FOLDER_ID:
 *    - Go to https://drive.google.com
 *    - Create or navigate to your target folder
 *    - The Folder ID is in the URL after /folders/
 *    - Example: https://drive.google.com/drive/folders/1WL9oAOLX8V6-wY5LD6sCsfl5-cOUzm5k
 *      → Folder ID is: 1WL9oAOLX8V6-wY5LD6sCsfl5-cOUzm5k
 */

const CONFIG = {
    // Replace with your OAuth Client ID
    GOOGLE_CLIENT_ID: '88174880511-m9jq7tknona72s1828r6rarge4863rtm.apps.googleusercontent.com',
    
    // Replace with your API Key
    GOOGLE_API_KEY: 'AIzaSyAA-2q08YBXVdeHnWvifljAJ3L9mhot1g0',
    
    // Replace with your Google Drive Folder ID
    GDRIVE_FOLDER_ID: '88174880511-m9jq7tknona72s1828r6rarge4863rtm.apps.googleusercontent.com'
};
