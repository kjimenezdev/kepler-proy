
from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from application.models import User, UserSchema

BP = Blueprint("index", __name__)

@BP.route("/")
def welcome():
    """Start point to test"""
    return "Welcome to the jungle"

