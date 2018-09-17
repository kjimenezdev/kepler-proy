"""User endpoint"""

from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from application.utils.extensions import DB
from application.models.models import UserScore, UserScoreSchema

USER_SCORE_SCHEMA = UserScoreSchema()
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
        new_score = UserScore(user_id, score, datetime.datetime.now())
        try:
            DB.session.add(new_score)
            DB.session.commit()
            return USER_SCORE_SCHEMA.jsonify(new_score)
        except SQLAlchemyError:
            return jsonify({"msg": "Error with sql"}), 403

    elif request.method == "GET":
        """ Retrieves all the user scores """
        all_scores = UserScore.query.all()
        result = USER_SCORES_SCHEMA.dump(all_scores)
        if not result.data:
            return jsonify({"msg": "No data"}), 201
        return jsonify(result.data), 200

@SCORE.route("/<int:user_id>", methods=["GET"])
def get_scores_by_user(user_id):
    """ Retrieves all the scores by user id"""
    all_scores = UserScore.query.filter_by(user_id=user_id)
    result = USER_SCORES_SCHEMA.dump(all_scores)
    if not result.data:
        return jsonify({"msg": "No data"}), 201
    return jsonify(result.data), 200
