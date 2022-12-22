from cli import bp
from db import conn
from config import app
from flask import Flask, render_template, request, jsonify

app.app_context().push()

app.config.from_pyfile("config.py")
app.config['JSON_AS_ASCII'] = False

conn.init_app(app)

app.register_blueprint(bp)



