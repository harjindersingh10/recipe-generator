# Deployment Instructions

## 🚀 Deploy to GitHub & Vercel

### Step 1: Push to GitHub

1. **Create the repository on GitHub:**
   - Go to https://github.com/harjindersingh10/recipe-generator
   - If it doesn't exist, create a new repository with this name

2. **Push your code:**
   ```bash
   # Navigate to your project directory
   cd C:\Users\Mypc\Downloads\mealwave-recipe-generator
   
   # Push to GitHub (you may need to authenticate)
   git push -u origin master
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project:**
   - Click "New Project"
   - Import your `recipe-generator` repository

3. **Configure Environment Variables:**
   - In Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add: `GEMINI_API_KEY` = `AIzaSyAf_WeGlXqSmhcUYT9Xxe2zF5PwFzZf3bQ`

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live at: `https://recipe-generator-[random].vercel.app`

### Step 3: Verify Deployment

1. **Test the app:**
   - Visit your Vercel URL
   - Try generating a recipe
   - Ensure AI functionality works

2. **Update README:**
   - Replace `[View Live App](https://your-app-url.vercel.app)` with your actual URL

## 🔒 Security Features Implemented

✅ **API Key Protection:**
- API key removed from code
- Added to `.gitignore`
- Uses environment variables
- Works with Vercel's environment system

✅ **Production Ready:**
- Proper error handling
- Environment variable fallbacks
- Vercel configuration included

## 🛠️ Files Created/Modified for Deployment

- `.env.example` - Template for environment variables
- `.gitignore` - Excludes sensitive files
- `vercel.json` - Vercel deployment configuration
- `README.md` - Project documentation
- `DEPLOYMENT.md` - This deployment guide
- Modified `geminiService.ts` - Secure API key handling

## 📝 Important Notes

1. **Never commit your actual API key to GitHub**
2. **Always use environment variables in production**
3. **The app will work offline during development with your local .env.local file**
4. **In production, Vercel will use the environment variable you set in the dashboard**

## 🆘 Troubleshooting

**If AI doesn't work after deployment:**
1. Check Vercel environment variables are set correctly
2. Verify API key is valid
3. Check Vercel function logs for errors
4. Ensure GEMINI_API_KEY is exactly as shown (case-sensitive)

**If GitHub push fails:**
1. Authenticate with GitHub CLI: `gh auth login`
2. Or use GitHub Desktop application
3. Or push via GitHub web interface