import os
from flask import Flask

app = Flask(__name__)
SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://root:root@172.22.0.2:5432/skat")
SQLALCHEMY_TRACK_MODIFICATIONS = False

