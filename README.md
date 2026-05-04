# Verses & Visions — Poetry Website

A free, beautiful poetry website with a no-code publishing panel.

## 🚀 Deploy in 5 Steps (Free)

### Step 1 — Push to GitHub
1. Create a new repo on [github.com](https://github.com)
2. Push this project to it:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) → Sign up free
2. Click **"Add new site" → "Import an existing project"**
3. Connect your GitHub repo
4. Click **Deploy** — done!

### Step 3 — Enable Netlify Identity (for CMS login)
1. In Netlify dashboard → **Site settings → Identity**
2. Click **"Enable Identity"**
3. Under **Registration** → set to **"Invite only"**
4. Under **Services → Git Gateway** → click **Enable**
5. Go to **Identity tab** → **Invite users** → invite your friend's email

### Step 4 — Set Up Contact Form
1. Go to [formspree.io](https://formspree.io) → Sign up free
2. Create a new form → copy the form ID
3. In `contact.html`, replace `YOUR_FORM_ID` with your actual ID

### Step 5 — Customize
- Replace `Her Name` in `about.html` with her real name
- Add her photo as `images/poet.jpg`
- Update social links in `contact.html`
- Change the site title in all HTML files

---

## ✍️ How She Publishes a Poem (No Coding!)

1. Go to `yoursite.netlify.app/admin`
2. Log in with her email
3. Click **"New Poem"**
4. Fill in: Title, Tag, Date, Poem text, Excerpt
5. Click **"Publish"** ✅

That's it. The poem goes live automatically.

---

## 📁 Project Structure

```
├── index.html          # Homepage
├── poems.html          # All poems
├── about.html          # About the poet
├── contact.html        # Contact form
├── css/
│   ├── style.css       # Desktop styles
│   └── mobile.css      # Mobile styles (applied separately)
├── js/
│   ├── main.js         # Shared logic (nav, cards, likes, modal)
│   ├── poems.js        # Poems page filtering
│   ├── about.js        # About page poem count
│   └── contact.js      # Contact form submission
├── data/
│   └── poems.json      # Poem data (edit to add poems manually)
├── admin/
│   ├── index.html      # Netlify CMS panel
│   └── config.yml      # CMS configuration
├── images/             # Put poet photo here as poet.jpg
└── netlify.toml        # Netlify deployment config
```

---

## 🎨 Customization

**Change colors** — edit CSS variables in `css/style.css`:
```css
:root {
  --accent: #c9a96e;        /* gold — change to any color */
  --bg: #0d0d0d;            /* background */
  --text-primary: #f0ece4;  /* main text */
}
```

**Add a poem manually** — edit `data/poems.json` and add a new object following the existing format.

**Change fonts** — update the Google Fonts link in each HTML file and the font variables in `style.css`.
