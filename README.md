# Happy Birthday, Divya 💐

A private, password-protected birthday website — a login page, then a
scrollable timeline of your memories together with photos and your own
words.

## 1. Run it (in VS Code)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open **http://127.0.0.1:5000** in your browser. The password is set in
`backend/app.py` (`SITE_PASSWORD`) — right now it's `axd@0809`. Change it
to whatever you like by editing that one line.

## 2. What's already in here

Your 6 memories (May 29 → August 26, 2026) and your closing "Queen of my
world" photo are already filled in, in `backend/memories.json`, with the
photos you sent already placed in `backend/static/images/`. The 6th memory
(August 26) has no photo attached — it currently shows a soft blank frame,
matching what you sent. Drop a photo in as `memory6.jpg` (or any name) and
set `"image": "memory6.jpg"` on that entry if you want to add one.

Open `backend/memories.json` any time to edit wording, add more memories,
reorder them, or swap photos — the page updates automatically, no code
changes needed. Example of one entry:

```json
{
  "date": "March 14, 2023",
  "title": "The day we met",
  "message": "Your words here.",
  "image": "memory1.jpg"
}
```

The closing photo/section is controlled by `"final_photo"`, `"final_title"`,
and `"final_message"` at the bottom of the same file.

## 3. Customize the look (optional)

Colors and fonts live in `backend/static/css/style.css`, in the `:root`
block at the top — change the hex values there to shift the palette. The
big cursive headings use Google Fonts' "Great Vibes"; body text uses
"Cormorant Garamond". A gentle gold-and-rose firework animation plays once
when the page loads, and again any time the "celebrate" button at the
bottom is clicked (`backend/static/js/script.js`).

## 4. Deploy it / send it to her

**Easiest — just for the two of you, on your own network:**
Run `python app.py`, then share your local IP (shown in the terminal) if
she's on the same Wi-Fi.

**To actually put it online so she can open it from anywhere:**
1. Push this project to a GitHub repo (see steps below).
2. Deploy for free on [Render](https://render.com) or
   [PythonAnywhere](https://www.pythonanywhere.com): connect your GitHub
   repo, set the start command to `python app.py`, and it gives you a
   public link.
3. Before deploying, in `app.py` change:
   ```python
   app.secret_key = "change-this-to-something-random-and-secret"
   ```
   to an actual random string (this keeps her login session secure).

## 5. Push to GitHub from VS Code

```bash
git init
git add .
git commit -m "Happy birthday website for Divya"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

---

*Made with love. Happy birthday, Divya.* 🌹
