"""Questions endpoint"""

import yaml
import os

from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from application.utils.extensions import DB
from application.models.question import Question, QuestionSchema
from application.models.option import Option, OptionSchema

QUESTION_SCHEMA = QuestionSchema()
QUESTIONS_SCHEMA = QuestionSchema(many=True)

OPTION_SCHEMA = OptionSchema()
OPTIONS_SCHEMA = OptionSchema(many=True)

QUESTION = Blueprint("question", __name__, url_prefix="/question")

# Question Endpoints

@QUESTION.route("/", methods=["POST", "GET"])
def handle_questions():
    """Handle questions"""
    if request.method == "POST":
        """Creates a new question"""
        content = request.json["content"]
        idx_correct = request.json["idx_correct"]
        question = Question(content, idx_correct).create()
        if not question:
            return jsonify({"msg": "Question already exists"}), 403
        else:
            return QUESTION_SCHEMA.jsonify(question)

    elif request.method == "GET":
        """ Retrieves all the questions"""
        all_questions = Question.query.all()
        result = QUESTIONS_SCHEMA.dump(all_questions)
        if not result.data:
            return jsonify({"msg": "No data"}), 201
        return jsonify(result.data), 200

@QUESTION.route("/<int:question_id>", methods=["GET", "PUT", "DELETE"])
def handle_single_question(question_id):
    """Handle single question functions"""
    if request.method == "GET":
        """ Retrieves a question by id"""
        question = Question.query.get(question_id)
        if not question:
            return jsonify({"msg":"No data"}), 201
        return QUESTION_SCHEMA.jsonify(question), 200

    elif request.method == "PUT":
        """Updates a question by it"s id"""
        question = Question.query.get(question_id)
        if not question:
            return jsonify({"msg":"No data"}), 403
        try:
            content = request.json["content"]
            idx_correct = request.json["idx_correct"]
            question.content = content
            question.idx_correct = idx_correct
            DB.session.commit()
            return QUESTION_SCHEMA.jsonify(question), 200
        except SQLAlchemyError:
            return jsonify({"msg":"Error with sql"}), 403

    elif request.method == "DELETE":
        """Deletes a question by it"s id"""
        question = Question.query.get(question_id)
        if not question:
            return jsonify({"msg":"No data"}), 201
        try:
            DB.session.delete(question)
            DB.session.commit()
            return QUESTION_SCHEMA.jsonify(question), 200
        except SQLAlchemyError:
            return jsonify({"msg":"Error with sql"}), 403


# Question Option Methods

@QUESTION.route("/option", methods=["POST", "GET"])
def handle_options():
    """Handle options"""
    if request.method == "POST":
        """Creates a new option"""
        question_id = request.json["question_id"]
        content = request.json["content"]
        position = request.json["position"]
        option = Option(question_id, content, position).create()
        if not option:
            return jsonify({"msg": "Error with sql"}), 403
        else:
            return OPTION_SCHEMA.jsonify(option)

    elif request.method == "GET":
        """ Retrieves all the options"""
        result = OPTIONS_SCHEMA.dump(Option.query.all())
        if not result.data:
            return jsonify({"msg": "No data"}), 201
        return jsonify(result.data), 200

@QUESTION.route("/option/<int:option_id>", methods=["GET", "PUT", "DELETE"])
def handle_single_option(option_id):
    """Handle single option functions"""
    if request.method == "GET":
        """ Retrieves a option by id"""
        option = Option.query.get(option_id)
        if not option:
            return jsonify({"msg":"No data"}), 201
        return OPTIONS_SCHEMA.jsonify(option), 200

    elif request.method == "PUT":
        """Updates a option by it"s id"""
        option = Option.query.get(option_id)
        if not option:
            return jsonify({"msg":"No data"}), 403
        try:
            content = request.json["content"]
            idx_correct = request.json["idx_correct"]
            option.content = content
            option.idx_correct = idx_correct
            DB.session.commit()
            return jsonify(option), 200

        except SQLAlchemyError:
            return jsonify({"msg":"Error with sql"}), 403

    elif request.method == "DELETE":
        """Deletes a option by it"s id"""
        option = Option.query.get(option_id)
        if not option:
            return jsonify({"msg":"No data"}), 201
        try:
            DB.session.delete(option)
            DB.session.commit()
            return OPTIONS_SCHEMA.jsonify(option), 200
        except SQLAlchemyError:
            return jsonify({"msg":"Error with sql"}), 403

@QUESTION.route("/<int:question_id>/option", methods=["GET"])
def options_by_question(question_id):
    """Retrieves all options by question"""
    # To test the relationships between tables
    if request.method == "GET":
        all_options = Option.query.filter_by(question_id=question_id)
        result = OPTIONS_SCHEMA.dump(all_options)
        if not result.data:
            return jsonify({"msg": "No data"}), 201
        return jsonify(result.data), 200


@QUESTION.route("/load/<string:file_name>", methods=["GET"])
def load_from_file(file_name):
    """Loads a the questions from the filename received as param"""
    if request.method == "GET":
        try:
            basedir = os.path.abspath(os.path.dirname(__file__))
            full_path = os.path.join(basedir, file_name)
            file = open(full_path, "r")
            try:
                questions = yaml.load(file)
                # questions = data_loaded['questions']
                if not questions:
                    return jsonify({"msg": "Voce partiu meu coracao"}), 201
                else:
                    # Drop the existent questions
                    Question.query.delete()
                    Option.query.delete()
                    for question in questions:
                        """Creates a new question"""
                        content = question["content"]
                        idx_correct = question["correct_idx"]
                        new_question = Question(content, idx_correct).create()
                        question_id = new_question.id
                        options = question['options']
                        for opt in options:
                            cont = opt["content"]
                            pos = opt["position"]
                            Option(question_id, cont, pos).create()

                    return jsonify({"msg": "All right all right baby"}), 201

            except yaml.YAMLError as exc:
                print(exc)
                return jsonify({"msg": "Error parsing file"}), 201
        except FileNotFoundError:
             return jsonify({"msg": "File not found"}), 201

@QUESTION.route("/all", methods=["GET"])
def retrieve_all():
    """ Retrieves all the questions joined the options"""
    if request.method == "GET":
        questions = Question.query.all()
        result = QUESTIONS_SCHEMA.dump(questions)
        if not result.data:
            return jsonify({"msg": "No data"}), 201
        return jsonify(result.data), 200


@QUESTION.route("/backup/<string:file_name>", methods=["GET"])
def backup_to_file(file_name):
    """Backups the questions from the filename received as param"""
    if request.method == "GET":
        basedir = os.path.abspath(os.path.dirname(__file__))
        full_path = os.path.join(basedir, file_name)
        file = open(full_path, "w")
        questions = Question.query.all()
        result = QUESTIONS_SCHEMA.dump(questions)
        try:
            yaml.dump(result.data, file, default_flow_style=False)
            return jsonify({"msg": "En todas"}), 200
        except yaml.YAMLError as exc:
            print(exc)
            return jsonify({"msg": "Error parsing file"}), 402
        except FileNotFoundError:
            return jsonify({"msg": "File not found"}), 403
