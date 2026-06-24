import os
from dotenv import load_dotenv

# Load environment variables before importing custom modules that depend on them
base_dir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(base_dir, '.env'))

import subprocess
from flask import Flask, redirect, url_for, session, render_template, jsonify, request, send_from_directory
from authlib.integrations.flask_client import OAuth
import pymongo
from Agents import AgentManager
import smtplib
from email.message import EmailMessage

app = Flask(
    __name__,
    template_folder=os.path.join(base_dir, 'templates'),
    static_folder=os.path.join(base_dir, 'static')
)
app.secret_key = os.getenv("FLASK_SECRET_KEY")

# 🔐 Session config
app.config['SESSION_COOKIE_NAME'] = 'google-login-session'
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['SESSION_COOKIE_SECURE'] = False
app.config['SESSION_PERMANENT'] = False





# 🔗 Google OAuth setup
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={'scope': 'openid email profile'}
)

# 👤 Session check for frontend React routing
@app.route('/auth/session', methods=['GET'])
def auth_session():
    user = session.get('user')
    return jsonify({"user": user}), 200

# 🏠 React SPA Routing entrypoints
@app.route('/')
@app.route('/auth')
@app.route('/dashboard')
@app.route('/workspace')
@app.route('/solution')
@app.route('/video')
def home():
    try:
        dist_dir = os.path.join(app.static_folder, 'dist')
        return send_from_directory(dist_dir, 'index.html')
    except Exception:
        return render_template('Home.html')

# 🎥 Video generation
@app.route('/generate_video', methods=['GET'])
def generate_video():
    subprocess.run(['manim', '-ql', 'generated_scene.py', 'MyScene', '--media_dir', './static/renders'])
    return redirect('/')

# 🔐 Login
@app.route('/login')
def login():
    redirect_uri = url_for('authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

# ✅ Auth callback
@app.route('/auth')
def authorize():
    token = google.authorize_access_token()
    resp = google.get('https://openidconnect.googleapis.com/v1/userinfo')
    user_info = resp.json()
    session['user'] = user_info

    return redirect('/')

# 🚪 Logout
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

# 🔄 Session clear (debug only)
@app.route('/clear')
def clear():
    session.clear()
    return redirect('/')
@app.route('/solution', methods=['POST'])
def agents():
    data = request.get_json() 
    question = data.get('name')
    response = AgentManager(question)
    print("Response: ",response) 
    return jsonify({"message": response}), 200

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    return render_template('contact.html')

@app.route('/guide', methods=['GET', 'POST'])
def guide():
    return render_template('guideline.html')    

if __name__ == '__main__':
    app.run(debug=False)
