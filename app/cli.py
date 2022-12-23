import os
import click
from flask import Blueprint

from app.models.Questions import Question
from app.models.Comments import Comments

from app.db import conn

bp = Blueprint('commands', __name__)

@bp.cli.command("create_db")
@click.option('-name', default="dpp")
def create_db(name):
    print("creating db %s " % name)
    conn.drop_all()
    conn.create_all()
    conn.session.commit()


