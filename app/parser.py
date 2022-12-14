from bs4 import BeautifulSoup
from models.Tests import Test
from config import app
from db import conn
import re

soup = BeautifulSoup(open('Sample2.html', 'r'), 'lxml')


def merge_data_in_db():
    app.config.from_pyfile("config.py")
    conn.init_app(app)

    p = soup.find_all('p')
    ul = soup.find_all('ul')
    # questions = list(map(lambda x: x.replace('\xa0', ''), list(map(lambda  x: x.text, soup.find_all('p')))))
    # answers = list(map(lambda x: x.replace('\xa0', ''), list(map(lambda  x: x.text, soup.find_all('li')))))

    test_data = dict()

    def get_right_answer(answers):
        recv = []
        for i in range(len(answers)):
            if 'True' in answers[i]:
                answers[i] = answers[i].replace('True', '')
                recv.append(i + 1)

        return None if len(recv) == 0 else recv

    for i in range(len(p) - 1):
        qst = p[i].text.replace("\xa0", "")
        question = re.sub(r'\w+\. ', '', qst)
        test_data[question] = dict()
        answers = list()
        for ans in ul[i]:
            answer = ans.text.replace("\xa0", "")
            answers.append(answer)
        test_data[question] = {
            'right_answer': get_right_answer(answers=answers),
            'answers': answers,
        }

    for key in test_data:
        val = test_data[key]
        test = Test()
        output = test.create(question=key, right_answer=val['right_answer'], answers=val['answers'])
        print(output)


if __name__ == "__main__":
    merge_data_in_db()
