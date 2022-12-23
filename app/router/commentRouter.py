import os
from flask import jsonify, current_app, request, send_from_directory, Blueprint
from sqlalchemy import func

from app.utils.util import representation_question
from app.models.Questions import Question
from app.models.Comments import Comments

bp = Blueprint('comment_router', __name__)

@bp.route("/comment", methods=['POST'])
def comments():
    if request.method == 'POST':
        new_comment = Comments()
        output = new_comment.create(
            question_id = request.json['question_id'],
            comment=request.json['comment']
        )
        return jsonify(output)

@bp.route("/comments/<question_id>", methods=['POST'])
def comment_for_question(question_id):
    if request.method == 'POST':
        question = Question.query.filter_by(id=question_id).first()

        if question:
            output = list()
            for comment in question.comments:
                output.append(comment.comment)
            return output

        return jsonify(status='Question not found')





