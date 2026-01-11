# How to Upload Your Files to GitHub

## What You Need to Upload

You need to upload **two main things**:

1. ✅ **`index.html`** - Your updated website file
2. ✅ **`assets/` folder** - All your images, fonts, logos, etc. (make sure it matches your local version)

## Method 1: Upload via GitHub Website (Easiest - No Git Required)

### Step 1: Go to Your Repository
1. Open: https://github.com/jdharris981/jdxcaptain-site
2. Make sure you're on the **`main` branch** (check the dropdown at the top)

### Step 2: Upload the Updated `index.html`
1. Click on **`index.html`** in the file list
2. Click the **pencil icon** (✏️) in the top right to edit
3. **Delete all the existing content**
4. Open your local `index.html` file (in your project folder)
5. **Copy ALL the content** from your local file
6. **Paste it** into the GitHub editor
7. Scroll down and click **"Commit changes"**
8. Add a message like: "Update index.html with latest changes"
9. Click **"Commit changes"**

### Step 3: Verify Your Assets Folder
1. Click on the **`assets`** folder in your GitHub repo
2. Make sure it has these subfolders:
   - `art/` (with JDXCAPTAIN-Dino-Print.png)
   - `fonts/` (with BetrayalOfMind-dBOZ.ttf and CmFont-pgggZ.ttf)
   - `CAPTAIN/` (with all your photos)
   - `logos/` (with JDXCAPTAIN-Dino-Text-Print crop.png)
   - `Album Covers/`
   - `merch/`

3. **If any files are missing**, you can upload them:
   - Click into the folder (e.g., `assets/art/`)
   - Click **"Add file"** → **"Upload files"**
   - Drag and drop your files
   - Click **"Commit changes"**

### Step 4: Check for EPK PDF
1. Check if you have an `assets/EPK/` folder with `JDX_CAPTAIN_EPK.pdf`
2. If not, create the folder and upload the PDF:
   - Click **"Add file"** → **"Create new file"**
   - Type: `assets/EPK/JDX_CAPTAIN_EPK.pdf` (this creates the folder)
   - Actually, better: Click **"Add file"** → **"Upload files"** and drag the PDF
   - Or create the folder first, then upload

---

## Method 2: Using Git (If You Want to Learn)

If you want to use Git commands (more advanced):

1. **Install Git** (if not already installed)
2. **Clone your repository:**
   ```bash
   cd "/Users/jharris6/Desktop/RB/Cursor Projects"
   git clone https://github.com/jdharris981/jdxcaptain-site.git
   ```

3. **Copy your files:**
   - Copy your updated `index.html` into the cloned folder
   - Make sure your `assets/` folder matches

4. **Commit and push:**
   ```bash
   cd jdxcaptain-site
   git add .
   git commit -m "Update website with latest changes"
   git push origin main
   ```

---

## ⚠️ Important: What Files GitHub Needs

Your website needs these files in GitHub:

```
jdxcaptain-site/
├── index.html          ← Your main website file
└── assets/
    ├── art/
    │   └── JDXCAPTAIN-Dino-Print.png  ← Background image
    ├── fonts/
    │   ├── BetrayalOfMind-dBOZ.ttf
    │   └── CmFont-pgggZ.ttf
    ├── CAPTAIN/
    │   ├── captain.jpeg
    │   ├── captain2.jpeg
    │   ├── CanyonClub6.jpeg
    │   ├── Media (28).jpeg
    │   ├── Media (30).jpeg
    │   └── ... (all other photos)
    ├── logos/
    │   └── JDXCAPTAIN-Dino-Text-Print crop.png
    ├── Album Covers/
    ├── merch/
    └── EPK/              ← If you have the PDF here
        └── JDX_CAPTAIN_EPK.pdf
```

---

## ✅ Quick Checklist

Before enabling GitHub Pages, make sure:

- [ ] `index.html` is updated with all your latest changes
- [ ] `assets/art/JDXCAPTAIN-Dino-Print.png` exists (background image)
- [ ] `assets/fonts/BetrayalOfMind-dBOZ.ttf` exists
- [ ] `assets/fonts/CmFont-pgggZ.ttf` exists
- [ ] All images in `assets/CAPTAIN/` are there
- [ ] `assets/logos/JDXCAPTAIN-Dino-Text-Print crop.png` exists
- [ ] EPK PDF is accessible (either in repo or at the GitHub link you're using)

---

## 🚀 After Uploading

Once all files are uploaded:

1. Go to your repo: https://github.com/jdharris981/jdxcaptain-site
2. Click **Settings** → **Pages**
3. Under **Source**, select **"Deploy from a branch"**
4. Choose **Branch: main** and **Folder: / (root)**
5. Click **Save**
6. Wait 1-2 minutes
7. Your site will be live at: **https://jdharris981.github.io/jdxcaptain-site/**

---

## 💡 Recommendation

**Use Method 1 (GitHub Website)** - It's the easiest and doesn't require any command-line tools. Just edit the `index.html` file directly on GitHub and make sure your assets folder is complete!
