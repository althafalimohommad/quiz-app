# GitHub Pages Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - Repository name: `quiz-app` (or your preferred name)
   - Description: "Interactive knowledge quiz with animated UI"
   - Make it **Public**
   - **DO NOT** initialize with README (we already have one)
5. Click **"Create repository"**

## Step 2: Connect Local Repository to GitHub

Copy your repository URL from GitHub (it will look like: `https://github.com/YOUR-USERNAME/quiz-app.git`)

Then run these commands in PowerShell (from the quiz-web folder):

```powershell
# Add GitHub remote
git remote add origin https://github.com/YOUR-USERNAME/quiz-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (gear icon)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

## Step 4: Wait and Access

1. GitHub will build your site (takes 1-2 minutes)
2. Your site will be live at: `https://YOUR-USERNAME.github.io/quiz-app/`
3. The URL will be shown in the GitHub Pages settings

## Quick Commands Reference

### If you already created the GitHub repository:

```powershell
# Navigate to project folder
cd "C:\Users\Mohmad Althaf Ali\OneDrive\Desktop\Java\quiz-web"

# Add GitHub remote (replace with your URL)
git remote add origin https://github.com/YOUR-USERNAME/quiz-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### To make updates later:

```powershell
# After making changes to files
git add .
git commit -m "Description of your changes"
git push
```

## Troubleshooting

### If you get "remote origin already exists":
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/quiz-app.git
```

### If authentication fails:
- Use a Personal Access Token instead of password
- Generate token at: Settings → Developer settings → Personal access tokens → Tokens (classic)
- Select scopes: `repo` (all)
- Use the token as your password when pushing

### To check remote URL:
```powershell
git remote -v
```

## Testing Locally

Before pushing, test your app locally:

1. Open `index.html` directly in a browser, OR
2. Use Python: `python -m http.server 8000`
3. Use Node.js: `npx http-server`
4. Use VS Code: Install "Live Server" extension and click "Go Live"

## Custom Domain (Optional)

If you want to use a custom domain:

1. Create a file named `CNAME` in your repository root
2. Add your domain name (e.g., `quiz.yourdomain.com`)
3. Configure DNS with your domain provider:
   - Type: CNAME
   - Host: quiz (or @)
   - Value: YOUR-USERNAME.github.io

---

✅ Once deployed, share your quiz app with anyone using the GitHub Pages URL!
