"""
Basic REST Backend to handle Trivia data.
"""

import os
import datetime

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from flask_marshmallow import Marshmallow

APP = Flask(__name__)
BASEDIR = os.path.abspath(os.path.dirname(__file__))
APP.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(BASEDIR, "trivia.sqlite")
APP.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
DB = SQLAlchemy(APP)
MA = Marshmallow(APP)

# APP.logger.setLevel()

# @APP.before_request
# def log_request():

    # if current_c
class User(DB.Model):
    """User table structure."""
    id = DB.Column(DB.Integer, primary_key=True)
    username = DB.Column(DB.String(80), unique=True)
    password = DB.Column(DB.String(120))

    def __init__(self, username, password):
        self.username = username
        self.password = password


class UserSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("id", "username")

USER_SCHEMA = UserSchema()
USERS_SCHEMA = UserSchema(many=True)


class UserScore(DB.Model):
    """User score table structure."""
    user_id = DB.Column(DB.Integer, primary_key=True)
    score = DB.Column(DB.Integer)
    created = DB.Column(DB.DateTime, primary_key=True)

    def __init__(self, user_id, score, created):
        self.user_id = user_id
        self.score = score
        self.created = created


class UserScoreSchema(MA.Schema):
    """Fields to convert to JSON."""
    class Meta:
        """Fields to expose"""
        fields = ("user_id", "score", "created")


USER_SCORE_SCHEMA = UserScoreSchema()
USER_SCORES_SCHEMA = UserScoreSchema(many=True)

# User endpoints

@APP.route("/user", methods=["POST"])
def add_user():
    """ Creates a new user from the provided params"""
    username = request.json["username"]
    password = request.json["password"]
    user = User.query.filter_by(username=username).first()
    if not user:
        try:
            new_user = User(username, password)
            DB.session.add(new_user)
            DB.session.commit()
            return USER_SCHEMA.jsonify(new_user), 200
        except SQLAlchemyError:
            return jsonify({"msg":"Error with sql"}), 403
    else:
        return jsonify({"msg":"User already exists"}), 403


@APP.route("/user", methods=["GET"])
def get_user():
    """ Retrieves all the stored users """
    all_users = User.query.all()
    result = USERS_SCHEMA.dump(all_users)
    if not result.data:
        return jsonify({"msg":"No data"}), 201
    return jsonify(result.data), 200

@APP.route("/user/<user_id>", methods=["GET"])
def user_detail(user_id):
    """ Retrieves a single user by id"""
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg":"No data"}), 201
    return USER_SCHEMA.jsonify(user), 200

@APP.route("/user/username/<username>", methods=["GET"])
def get_by_username(username):
    """ Retrieves a single user by it"s username"""
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"msg":"No data"}), 201
    return USER_SCHEMA.jsonify(user), 200

@APP.route("/user/auth", methods=["POST"])
def user_login():
    """Authenticates the user by making sure parameters equal the saved user's parameters"""
    username = request.json["username"]
    # password = request.json["password"]
    user = User.query.filter_by(username=username).first()
    if user:
        ujson = USER_SCHEMA.jsonify(user)
        # if ujson["password"] ==  password:
            # return jsonify({"msg":"User does not exist"}), 201
        return ujson, 200
    # else:
    return jsonify({"msg":"User does not exist"}), 403

@APP.route("/user/<user_id>", methods=["PUT"])
def user_update(user_id):
    """ Updates a user by it"s id """
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg":"No data"}), 403
    try:
        username = request.json["username"]
        password = request.json["password"]
        user.username = username
        user.password = password
        DB.session.commit()
        return USER_SCHEMA.jsonify(user), 200
    except SQLAlchemyError:
        return jsonify({"msg":"Error with sql"}), 403

@APP.route("/user/<user_id>", methods=["DELETE"])
def user_delete(user_id):
    """ Deletes a user by it"s id """
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg":"No data"}), 201
    try:
        DB.session.delete(user)
        DB.session.commit()
        return USER_SCHEMA.jsonify(user), 200
    except SQLAlchemyError:
        return jsonify({"msg":"Error with sql"}), 403


# User Score Endpoints

@APP.route("/score", methods=["POST"])
def add_user_score():
    """ Creates a new user score """
    user_id = request.json["user_id"]
    score = request.json["score"]
    new_score = UserScore(user_id, score, datetime.datetime.now())
    try:
        DB.session.add(new_score)
        DB.session.commit()
        return USER_SCORE_SCHEMA.jsonify(new_score)
    except SQLAlchemyError:
        return jsonify({"msg": "Error with sql"}), 403

@APP.route("/score", methods=["GET"])
def get_user_scores():
    """ Retrieves all the user scores """
    all_scores = UserScore.query.all()
    result = USER_SCORES_SCHEMA.dump(all_scores)
    if not result.data:
        return jsonify({"msg": "No data"}), 201
    return jsonify(result.data), 200

@APP.route("/score/<user_id>", methods=["GET"])
def get_scores_by_user(user_id):
    """ Retrieves all the scores by user id"""
    all_scores = UserScore.query.filter_by(user_id=user_id)
    result = USER_SCORES_SCHEMA.dump(all_scores)
    if not result.data:
        return jsonify({"msg": "No data"}), 201
    return jsonify(result.data), 200

@APP.route("/")
def welcome():
    """ Start point to test"""
    return "Welcome to the jungle"

if __name__ == "__main__":
    APP.run(host="0.0.0.0", port=80)
    # APP.run(debug=True, host="0.0.0.0")
