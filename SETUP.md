# Secure Setup Guide - Francesca's Questionnaire

## ⚠️ IMPORTANT: Security Notice

Your API keys and credentials are **secret values** that should NEVER be committed to version control (GitHub, GitLab, etc.). This project uses a separate `config.js` file to store credentials securely.

---

## Quick Setup

### Step 1: Create `config.js`

Create a file named `config.js` in the same folder as `francesca_secure.html`:

```javascript
const CONFIG = {
    GOOGLE_CLIENT_ID: 'YOUR_OAUTH_CLIENT_ID.apps.googleusercontent.com',
    GOOGLE_API_KEY: 'YOUR_API_KEY_HERE',
    GDRIVE_FOLDER_ID: 'YOUR_FOLDER_ID_HERE'
};
```

### Step 2: Get Your Google Drive Folder ID

1. Go to [drive.google.com](https://drive.google.com)
2. Create a new folder (or use an existing one) for questionnaire submissions
3. Look at the URL in your browser
4. Copy the ID from the URL: `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`

### Step 3: Get Google Cloud Credentials

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Create a new project (or select existing one)
3. Click **APIs & Services** → **Library**
4. Search for and enable **Google Drive API**

5. Click **APIs & Services** → **Credentials**
6. Click **Create Credentials** → **API Key**
   - Copy the key (looks like `AIzaSy...`)

7. Click **Create Credentials** → **OAuth Client ID**
   - Application type: **Web application**
   - Add your deployed domain to **Authorized JavaScript origins**, e.g.:
     - `http://localhost:3000` (for local testing)
     - `https://yourdomain.com` (for production)
   - Copy the Client ID (looks like `xxx.apps.googleusercontent.com`)

### Step 4: Test the Connection

1. Open `francesca_secure.html` in a browser
2. Click **Sign in with Google**
3. Authorize the app
4. Fill in some fields and click **Save Progress**
5. Check your Google Drive folder - you should see a `francesca_progress.json` file

---

## File Structure

```
your-folder/
├── francesca_secure.html    ← Main questionnaire (no secrets)
├── config.js                ← Your credentials (NEVER commit this!)
├── SETUP.md                 ← This file
└── index.html              ← Home page (if applicable)
```

---

## Adding .gitignore

Add these entries to your `.gitignore` to prevent accidentally committing secrets:

```
# Credentials and config
config.js
*.local.js

# Browser storage (optional, but recommended)
*.log
```

---

## Troubleshooting

### "Sign in failed" error
- Check that your OAuth Client ID is correctly entered in `config.js`
- Make sure you added your domain to "Authorized JavaScript origins" in Google Cloud Console
- Ensure the OAuth consent screen is configured

### "API key not valid" error
- Verify your API key is correct in `config.js`
- Check that the Google Drive API is enabled in your project
- Restrict the API key to the Drive API if you set restrictions

### File not saving to Drive
- Make sure the Folder ID is correct
- Check browser console for errors
- Verify your Google account has access to the folder

### Nothing appearing on results page
- The questionnaire saves to localStorage by default
- Google Drive saving requires successful OAuth sign-in
- Check browser console (F12) for detailed error messages

---

## Security Best Practices

1. **Never hardcode credentials** in HTML or JavaScript files
2. **Rotate your API keys** if they become compromised
3. **Restrict API keys** to specific APIs and domains in Google Cloud Console
4. **Use environment variables** for credentials in production
5. **Enable 2-Factor Authentication** on your Google account
6. **Monitor API usage** in Google Cloud Console for unusual activity

---

## Revoke Compromised Credentials

If your API key is exposed:

1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Find your key and click the delete/trash icon
4. Create a new API key
5. Update `config.js` with the new key

For OAuth client:
1. Go to **APIs & Services** → **Credentials**
2. Find your OAuth Client ID
3. Click the delete icon
4. Create a new one
5. Update `config.js`

---

## Questions?

If you encounter issues, check the browser console (F12 → Console tab) for error messages. Common issues are usually related to:
- Incorrect credentials in config.js
- Missing API/Domain authorization in Google Cloud Console
- Browser blocking third-party cookies (try enabling them)