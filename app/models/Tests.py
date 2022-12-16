import os
import sys

# from fuzzywuzzy import fuzz
from fuzzywuzzy import process

sys.path.insert(1, os.path.join(sys.path[0], '../app/'))
from db import conn
from config import app


class Test(conn.Model):
    id = conn.Column(conn.Integer, primary_key=True)
    question = conn.Column(conn.Text, nullable=False)
    right_answer = conn.Column(conn.PickleType, nullable=True)
    answers = conn.Column(conn.PickleType, nullable=False)
    semi_answers = conn.Column(conn.PickleType, nullable=True)

    def __repr__(self):
        return self.question

    def create(self,
               question: str,
               right_answer,
               answers,
               semi_answers
               ):
        with app.app_context():
            if Test.query.filter_by(question=question).first():
                return {"status": False, "msg": "Test already exist"}
            else:
                self.question = question,
                self.right_answer = right_answer,
                self.answers = answers
                self.semi_answers = semi_answers

                conn.session.add(self)
                conn.session.commit()

                return {"status": True, "msg": "Test created"}


    def find_question(self, qst: str):
        with app.app_context():
            questions = Test.query.filter(Test.question!=None).all()

            probably_answers = process.extract(qst, questions, limit=3)
            output = []

            for i in range(len(probably_answers)):
                ans_id = Test.query.filter_by(question=str(probably_answers[i][0])).first()
                data = {ans_id.id: probably_answers[i][0]}
                output.append(data)

            return output




