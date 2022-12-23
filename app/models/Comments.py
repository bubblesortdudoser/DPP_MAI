import sys
import os

sys.path.insert(1, os.path.join(sys.path[0], '../../app/'))
from ..db import conn
from app.config import app

from .Questions import Question

class Comments(conn.Model):
    id = conn.Column(conn.Integer, primary_key=True)
    comment = conn.Column(conn.Text, nullable=False)
    question_id = conn.Column(conn.Integer, conn.ForeignKey('question.id'), nullable=False)
    question = conn.relationship('Question', backref=conn.backref('comments', lazy=True))

    def __repr__(self):
        return '<Comment %r>' % self.comment

    def create(self, question_id: int, comment: str):
        """
        create question
        """

        with app.app_context():

            self.comment = comment

            question = Question.query.filter_by(id=question_id).first()

            if question:

                question.comments.append(self)
                current_db_sessions = conn.object_session(question)
                current_db_sessions.add(question)
                current_db_sessions.commit()

                return {"status": True, "msg": "Comment created", "comment": self.comment}

            return {"status": False, "msg": "Question not found"}


if __name__ == "__main__":
    pass