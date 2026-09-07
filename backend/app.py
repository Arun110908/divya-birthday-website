"""
Happy Birthday Divya — a small password-protected website.

Run with:  python app.py
Then open: http://127.0.0.1:5000
"""
import json
import os
from functools import wraps
from pathlib import Path

from flask import Flask, render_template, request, redirect, url_for, session

BASE_DIR = Path(__file__).resolve().parent

app = Flask(__name__)
# Used to sign the login session cookie. Set a SECRET_KEY environment
# variable in production (e.g. on Render); falls back to this for local use.
app.secret_key = os.environ.get("SECRET_KEY", "change-this-to-something-random-and-secret")

# ---- The one and only password for the site ----
# Change this to whatever you like.
SITE_PASSWORD = "axd@0809"


def load_memories():
    with open(BASE_DIR / "memories.json", "r", encoding="utf-8") as f:
        data = json.load(f)
    return data


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("logged_in"):
            return redirect(url_for("login"))
        return view(*args, **kwargs)
    return wrapped


@app.route("/", methods=["GET"])
def root():
    if session.get("logged_in"):
        return redirect(url_for("memories_page"))
    return redirect(url_for("login"))


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        entered = request.form.get("password", "")
        if entered == SITE_PASSWORD:
            session["logged_in"] = True
            return redirect(url_for("memories_page"))
        error = "That's not quite right — try again."
    return render_template("login.html", error=error)


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


@app.route("/memories")
@login_required
def memories_page():
    data = load_memories()
    return render_template(
        "memories.html",
        site_title=data.get("site_title", "Happy Birthday"),
        recipient_name=data.get("recipient_name", ""),
        sender_name=data.get("sender_name", ""),
        opening_message=data.get("opening_message", ""),
        closing_message=data.get("closing_message", ""),
        memories=data.get("memories", []),
        final_photo=data.get("final_photo"),
        final_title=data.get("final_title", ""),
        final_message=data.get("final_message", ""),
    )


if __name__ == "__main__":
    app.run(debug=True, port=5000)
