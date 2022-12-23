import os
from flask import jsonify, current_app, request, send_from_directory, Blueprint
from sqlalchemy import func

from app.utils.util import representation_question
from app.models.Questions import Question

bp = Blueprint('question_router', __name__)

@bp.route("/question", methods=['POST', 'GET'])
def questions():
    if request.method == 'POST':
        new_question = Question()
        output = new_question.create(
            question=request.json['question'],
            answers=request.json['answers'],
            media_uuid=request.json['media_uuid'] if request.json.get('media_uuid') is not None else None
        )
        return jsonify(output)

    if request.method == 'GET':
        qst = Question.query.filter(Question.question is not None).all()
        return jsonify(list(map(lambda x: representation_question(x), qst)))

@bp.route("/question/<id>", methods=['PATCH', 'GET', 'DELETE'])
def question(id):
    if request.method == 'GET':
        question = Question.query.filter_by(id=id).first()
        output = representation_question(question) if question is not None else jsonify('question does not exist')
        return jsonify(output)

    if request.method == 'PATCH':
        question = Question.query.filter_by(id=id).first()
        if question is not None:
            question.question = request.json['question'] if request.json.get('question') is not None else question.question  # int
            question.answers = request.json['answers'] if request.json.get('answers') is not None else question.answers,
            question.phone = request.json['media_uuid'] if request.json.get('media_uuid') is not None else question.media_uuid,
            output = question.update(question=question)
            return jsonify(output)
        else:
            return jsonify({"status": False, "msg": "question doesnt found"})

    if request.method == 'DELETE':
        if Question.query.filter_by(id=id).first() is not None:
            return jsonify(Question.query.filter_by(id=id).first().delete())
        else:
            return jsonify({"status": False, "msg": "question doesnt found"})

@bp.route("/search_question", methods=['POST'])
def search_question():
    if request.method == 'POST':
        qst = Question()
        search_question = request.json['search_question']

        output = qst.find_question(qst=search_question)

        if output is not None:
            return jsonify(list(map(lambda x: representation_question(x), output)))

        return []

@bp.route('/uploads/<name>')
def download_file(name):
    print(name)
    return send_from_directory('../media/', name)

@bp.route('/uploader', methods = ['POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      f.save('app/media/'+f.filename)
      return str(f.filename)




