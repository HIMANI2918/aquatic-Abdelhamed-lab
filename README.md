# Aquatic Animal Health Management Lab – Website

A simple static website (plain HTML + CSS, no build step) with:

- Principal Investigator section (photo, name, email, phone, office)
- Lab Members section (blank photo + name placeholders)
- Contact section

## Edit the content

Open `index.html` and change the text:

| What | Where to look in `index.html` |
|------|-------------------------------|
| PI name, bio, email, phone, office | `<section id="pi">` |
| Lab member names and roles | `<section id="members">` – each `<article class="member">` is one person |
| Contact address | `<section id="contact">` |

**Add a member:** copy one whole `<article class="member"> ... </article>` block and paste it below the last one.

## Pages (navigation tabs)

| Tab | File | What to edit |
|-----|------|--------------|
| Home (Research, PI, People, Contact) | `index.html` | PI details, lab member names, research text |
| Lab Activities | `activities.html` | Each `<article class="card">` is one activity |
| Gallery | `gallery.html` | Photos go in `images/gallery/photo1.jpg` ... `photo12.jpg`; edit the captions |
| Publications | `publications.html` | One `<li>` per paper; add the link in `href="#"`; Scholar/ORCID buttons at the top |
| Awards & Honors | `awards.html` | Each `<article class="award">` is one award |

Placeholders are shown in [square brackets] or as 20XX. The Abdelhamed et al. 2019/2023/2024 entries in
Publications come from the AMR slides and still need full titles, journals and author lists.

To add a new tab, copy an existing page (e.g. `awards.html`), then add a link for it in the `<nav>` of every page.

## Add photos

Put images in the `images/` folder using these names (or edit the `src` in `index.html`):

- `images/pi.jpg` – Principal Investigator
- `images/member1.jpg` … `images/member6.jpg` – lab members
- `images/gallery/photo1.jpg` … `photo12.jpg` – Gallery page

Until a file exists, a grey placeholder is displayed automatically.

## Preview locally

Just double-click `index.html`, or run:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Research diagrams (front page)

The diagrams from the AMR slides are in `images/research/` and shown in the **Research** and
**Research Highlights** sections of `index.html`. Click a diagram on the page to enlarge it.
To replace one, overwrite the file with the same name, or edit its `src` line.

## Deploy with GitHub Pages (account: HIMANI2918)

1. Go to https://github.com/new while signed in as **HIMANI2918**.
2. Name the repository, for example `aquatic-lab` (site address will be
   `https://himani2918.github.io/aquatic-lab/`). Choose **Public**, leave all "Add a README / .gitignore"
   boxes unticked, and click **Create repository**.
   - To get the shorter address `https://himani2918.github.io/`, name the repository `HIMANI2918.github.io` instead.
3. Upload the files. Easiest (no terminal): on the new empty repository page click **uploading an existing file**,
   unzip this folder, and drag in everything *including the hidden `.github` folder*
   (`index.html`, `styles.css`, `README.md`, `images/`, `.github/`), then **Commit changes**.
   If the `.github` folder will not drag in, create the file in the browser instead:
   **Add file → Create new file**, type `.github/workflows/deploy.yml`, paste in the contents, and commit.

   Or with a terminal, from inside the unzipped folder:
   ```bash
   git init
   git add .
   git commit -m "Initial lab website"
   git branch -M main
   git remote add origin https://github.com/HIMANI2918/aquatic-lab.git
   git push -u origin main
   ```
4. In the repository open **Settings → Pages**, and under **Build and deployment → Source** choose **GitHub Actions**.
5. Open the **Actions** tab. The "Deploy to GitHub Pages" run should turn green in about a minute.
   Your site is then live at `https://himani2918.github.io/aquatic-lab/`.

To change anything later, edit the file on GitHub (pencil icon) or upload a new version. Each commit to `main`
redeploys the site automatically.

**If it does not appear:** check the Actions tab for a red run (usually Pages was not set to "GitHub Actions"),
and make sure the repository is Public (free accounts need that for Pages).
