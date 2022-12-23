import sys
import os

sys.path.insert(1, os.path.join(sys.path[0], '../../app/'))
from ..db import conn
from app.config import app

from typing import Optional

from fuzzywuzzy import process


class Question(conn.Model):
    id = conn.Column(conn.Integer, primary_key=True)
    question = conn.Column(conn.Text, nullable=False)
    description = conn.Column(conn.Text, nullable=True)
    answers = conn.Column(conn.PickleType, nullable=False)
    media_uuid = conn.Column(conn.String(2048), nullable=True)

    def __repr__(self):
        return '<Question %r>' % self.question

    def create(self, question: str, answers, description: Optional[str] = None, media_uuid: Optional[str] = None):
        """
        create question
        """

        with app.app_context():
            if Question.query.filter_by(question=question).first():
                return {"status": False, "msg": "question already exist"}
            else:

                self.question = question
                self.answers = answers
                self.description = description if description is not None else None
                self.media_uuid = media_uuid if media_uuid is not None else None

                conn.session.add(self)
                conn.session.commit()

                return {"status": True, "msg": "question created"}

    def update(self, question):
        """
        update question
        """

        with app.app_context():
            if Question.query.filter_by(question=self.question).first():
                qst = Question.query.filter_by(question=self.question).first()
                qst.question = question.question
                qst.answers = question.answers[0]
                qst.description = question.description
                qst.media_uuid = question.media_uuid

                conn.session.commit()
                return {"status": True, "msg": "question updated"}
            else:
                return {"status": False, "msg": "question doesnt found"}

    def delete(self):
        """
        delete question
        """

        with app.app_context():
            if Question.query.filter_by(question=self.question).first():
                Question.query.filter_by(question=self.question).delete()
                conn.session.commit()
                return {"status": True, "msg": "question deleted"}
            else:
                return {"status": False, "msg": "question doesnt found"}

    def find_question(self, qst: str):
        with app.app_context():
            questions = Question.query.filter(Question.question != None).all()

            probably_answers = process.extract(qst, questions, limit=10)
            ids = []
            output = []

            if len(probably_answers) != 0:
                for qst in probably_answers:
                    ids.append(qst[0].id)

                for id in ids:
                    output.append(Question.query.filter_by(id=id).first())

                return output

            return None

if __name__ == "__main__":
    pass