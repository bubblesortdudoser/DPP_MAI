from bs4 import BeautifulSoup
from models.Tests import Test
from config import app
from db import conn
import re

soup = BeautifulSoup(open('Sample3.html', 'r'), 'lxml')

app.config.from_pyfile("config.py")
conn.init_app(app)

question = ''
answers = []

p = soup.find('p')
question = p.text
print(question)

next_tag = True
i = 0
while next_tag is not None:
    if i == 0:
        next_tag = p.nextSibling

    if next_tag.name == 'p':
        question += next_tag.text
    elif next_tag.name == 'ul':
        for li in next_tag:
            answers.append(li.text)

        question = ''

    i+=1
    next_tag = next_tag.nextSibling

    print(question)