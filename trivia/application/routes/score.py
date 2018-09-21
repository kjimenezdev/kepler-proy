"""User endpoint"""

import datetime

from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from application.utils.extensions import DB
from application.models.score import Score, ScoreSchema, UserScoreSchema
from application.models.user import User, UserSchema

SCORE_SCHEMA = ScoreSchema()
SCORES_SCHEMA = ScoreSchema(many=True)
USER_SCORES_SCHEMA = UserScoreSchema(many=True)


SCORE = Blueprint("score", __name__, url_prefix="/score")

# User Score Endpoints

@SCORE.route("/", methods=["POST", "GET"])
def user_rest():
    """Handle documents"""
    if request.method == "POST":
        """Creates a new user score """
        user_id = request.json["user_id"]
        score = request.json["score"]
        new_score = Score(user_id, score, datetime.datetime.now())
        try:
            DB.session.add(new_score)
            DB.session.commit()
            return SCORE_SCHEMA.jsonify(new_score)
        except SQLAlchemyError as sqlErr:
            print(sqlErr)
            return jsonify({"msg": "Error with sql"}), 403

    elif request.method == "GET":
        """ Retrieves all the user scores """
        # all_scores = Score.query.all()
        all_scores = DB.session.query(User.id, User.username, Score.score, Score.created).all()
        result = USER_SCORES_SCHEMA.dump(all_scores)
        if not result.data:
            return jsonify({"msg": "No data"}), 201
        return jsonify(result.data), 200

@SCORE.route("/<int:user_id>", methods=["GET"])
def get_scores_by_user(user_id):
    """ Retrieves all the scores by user id"""
    print(user_id);
    # all_scores = DB.session.query(User.id, User.username, Score.score, Score.created).filter_by(user_id=user_id).all()
    all_scores = DB.session.query(User.id, User.username, Score.score, Score.created).filter_by(id=user_id).all()
    print(str(all_scores))
    result = USER_SCORES_SCHEMA.dump(all_scores)
    if not result.data:
        return jsonify({"msg": "No data"}), 201
    return jsonify(result.data), 200
