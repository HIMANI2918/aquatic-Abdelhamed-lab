# Aquatic Animal Health Management Lab – Website

A simple website that is edited through plain text files. **You never need to touch the HTML or CSS.**

## The two folders you edit

```
content/   <- all the TEXT on the site
images/    <- all the PICTURES on the site
```

### content/ (text)

| File | What it controls | Page |
|------|------------------|------|
| `pi.json` | PI name, title, photo, email, phone, office, research interests, education | Home |
| `members.json` | Lab member names, roles, photo file names | Home |
| `lab.json` | Contact address at the bottom of the Home page | Home |
| `publications.json` | Papers (authors, title, journal, year) | Publications |
| `activities.json` | Projects, field work, teaching, outreach | Lab Activities |
| `awards.json` | Awards and honors | Awards & Honors |
| `gallery.json` | Gallery photo list and captions | Gallery |

### images/ (pictures)

```
images/pi.jpg                 PI photo
images/members/               lab member photos (member1.jpg ...)
images/gallery/               gallery photos (photo1.jpg ...)
images/research/              research diagrams (already included)
```

## How to edit on GitHub (no software needed)

1. Open your repository, then the `content` folder, then the file (for example `members.json`).
2. Click the **pencil icon**, change the text between the quote marks, and click **Commit changes**.
3. Wait about a minute and refresh the live site (Ctrl+Shift+R, or Cmd+Shift+R on Mac).

**Rules for the text files**
- Change only what is between the `"quote marks"`. Keep the quote marks, commas and `{ }` `[ ]` brackets.
- To add a person, paper, award, activity or photo: copy one whole `{ ... }` block, paste it right after, and put a **comma** between the two blocks.
- Put `*stars*` around words you want in *italics* (for species names).
- If a section goes blank or shows a red message, there is a missing comma or quote mark in that file. Click **History** on the file to go back to the last working version.

## How to add photos

1. Open the folder on GitHub (for example `images/members`).
2. Click **Add file → Upload files**, drag the pictures in, and commit.
3. Make sure the file name matches the `"photo"` entry in the matching content file (for example `"photo": "images/members/member1.jpg"`). If you use a different name or `.png`, change that entry.

## Add a new publication (example)

In `content/publications.json`, add before the closing `]`:

```json
    {
      "year": 2025,
      "authors": "Abdelhamed H., Smith J.",
      "title": "Title of the paper about *Edwardsiella ictaluri*",
      "journal": "Journal Name, 12(3), 100-110"
    }
```

(and a comma after the `}` of the block above). Years are sorted automatically, newest first.

## Preview on your computer (optional)

The pages read the files in `content/`, so double-clicking `index.html` will not work. Run this inside the folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deployment (GitHub Pages)

Already set up: Settings → Pages → Source = **GitHub Actions**, with the workflow in `.github/workflows`.
Every change you commit to `main` is published automatically (watch the **Actions** tab).
