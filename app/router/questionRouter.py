import os
from flask import jsonify, current_app, request, send_from_directory, Blueprint
from sqlalchemy import func

from app.utils.util import representation_question
from app.models.Questions import Question

bp = Blueprint('question_router', __name__)

@bp.route("/question", methods=['POST', 'GET'])
def questions():
    try:
        if request.method == 'POST':
            new_question = Question()
            output = new_question.create(
                question=request.json['question'],
                description = request.json['description'] if request.json.get('description') is not None else None,
                answers=request.json['answers'],
                media_uuid=request.json['media_uuid'] if request.json.get('media_uuid') is not None else None
            )
            return jsonify(output)

        if request.method == 'GET':
            qst = Question.query.filter(Question.question is not None).all()
            list(map(lambda x: x.answers[0] if x.answers is tuple else x.answers, qst))
            return jsonify(list(map(lambda x: representation_question(x), qst)))

    except Exception as e:
        print(e)
        pass

@bp.route("/question/<id>", methods=['PATCH', 'GET', 'DELETE'])
def question(id):
    try:
        if request.method == 'GET':
            question = Question.query.filter_by(id=id).first()
            if question:
                if type(question.answers) is tuple:
                    question.answers = question.answers[0]
                output = representation_question(question) if question is not None else jsonify('question does not exist')
                return jsonify(output)
            return jsonify('question does not exist')

        if request.method == 'PATCH':
            question = Question.query.filter_by(id=id).first()
            if question is not None:
                question.question = request.json['question'] if request.json.get('question') is not None else question.question  # int
                question.answers = request.json['answers'] if request.json.get('answers') is not None else question.answers,
                question.description = request.json['description'] if request.json.get('description') is not None else question.description,
                question.media_uuid = request.json['media_uuid'] if request.json.get('media_uuid') is not None else question.media_uuid,
                output = question.update(question=question)
                return jsonify(output)
            else:
                return jsonify({"status": False, "msg": "question doesnt found"})

        if request.method == 'DELETE':
            if Question.query.filter_by(id=id).first() is not None:
                return jsonify(Question.query.filter_by(id=id).first().delete())
            else:
                return jsonify({"status": False, "msg": "question doesnt found"})

    except Exception as e:
        print(e)
        pass

@bp.route("/search_question", methods=['POST'])
def search_question():
    try:
        if request.method == 'POST':
            qst = Question()
            search_question = request.json['search_question']

            output = qst.find_question(qst=search_question)

            if output is not None:
                return jsonify(list(map(lambda x: representation_question(x), output)))

            return []

    except Exception as e:
        print(e)
        pass

@bp.route('/uploads/<name>')
def download_file(name):
    try:
        return send_from_directory('../media/', name)
    except Exception as e:
        print(e)
        pass

@bp.route('/uploader', methods = ['POST'])
def upload_file():
    try:
       if request.method == 'POST':
          f = request.files['file']
          f.save('app/media/'+f.filename)
          return str(f.filename)
    except Exception as e:
        print(e)
        pass




