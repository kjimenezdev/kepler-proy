"""User endpoint"""

from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from application.models.user import User, UserSchema
from application.utils.extensions import DB
from application.utils.smtp import SMTPConstants

USER_SCHEMA = UserSchema()
USERS_SCHEMA = UserSchema(many=True)

USER = Blueprint("user", __name__, url_prefix="/user")


# @USER.route("/", methods=["GET"])
# def test_mail ():



@USER.route("/", methods=["POST", "GET"])
def handle_user():
    if request.method == "POST":
        """Creates a new user from the provided params"""
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

    elif request.method == "GET":
        """ Retrieves all the stored users"""
        all_users = User.query.all()
        result = USERS_SCHEMA.dump(all_users)
        if not result.data:
            return jsonify({"msg":"No data"}), 201
        return jsonify(result.data), 200



@USER.route("/<int:user_id>", methods=["GET", "PUT", "DELETE"])
def user_id_functions(user_id):

    if request.method == "GET":
        """Retrieves a single user by id"""
        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg":"No data"}), 201
        return USER_SCHEMA.jsonify(user), 200

    elif request.method == "PUT":
        """Updates a user by it"s id"""
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

    elif request.method == "DELETE":
        """Deletes a user by it"s id"""
        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg":"No data"}), 201
        try:
            DB.session.delete(user)
            DB.session.commit()
            return USER_SCHEMA.jsonify(user), 200
        except SQLAlchemyError:
            return jsonify({"msg":"Error with sql"}), 403

@USER.route("/auth", methods=["POST"])
def user_login():
    """Authenticates the user by making sure parameters equal the saved user's parameters"""
    username = request.json["username"]
    password = request.json["password"]
    user = User.query.filter_by(username=username).first()
    if user:
        # Validates user password
        if user.verify_password(password):
            ujson = USER_SCHEMA.jsonify(user)
            return ujson, 200
        else:
            return jsonify({"msg":"Incorrect password"}), 403
    return jsonify({"msg":"User does not exist"}), 403

