import os
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})
SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://root:root@172.27.0.2:5432/dpp_dev")
SQLALCHEMY_TRACK_MODIFICATIONS = False

