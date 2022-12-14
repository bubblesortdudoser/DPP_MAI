import os
import click
from flask import Blueprint

from models.Tests import Test

from db import conn

bp = Blueprint('commands', __name__)


@bp.cli.command("create_db")
@click.option('-name', default="Skat")
def create_db(name):
    print("creating db %s " % name)
    conn.drop_all()
    conn.create_all()
    conn.session.commit()


@bp.cli.command("bot")
@click.option('-bot', default="bot")
def bot(bot):
    print("start %s " % bot)
    os.system("python bot.py")
